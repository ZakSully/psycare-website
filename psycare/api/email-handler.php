<?php
// Set headers first
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

// Error handling
error_reporting(E_ALL);
ini_set('display_errors', 0);

try {
    // Handle preflight requests
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    // Validate request method
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Method not allowed');
    }

    require_once __DIR__ . '/../vendor/autoload.php';

    // Load environment variables
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
    $dotenv->load();

    // Get POST data
    $formData = $_POST;
    $formType = $formData['form_type'] ?? '';
    $recaptchaToken = $formData['recaptcha_token'] ?? '';

    if (empty($recaptchaToken)) {
        throw new Exception('reCAPTCHA token is required');
    }

    // Validate reCAPTCHA
    $recaptchaSecret = $_ENV['RECAPTCHA_SECRET_KEY'];
    $recaptchaResponse = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$recaptchaSecret}&response={$recaptchaToken}");
    $recaptchaData = json_decode($recaptchaResponse);

    if (!$recaptchaData->success) {
        throw new Exception('reCAPTCHA verification failed');
    }

    // Validate required fields based on form type
    $requiredFields = [
        'contact' => ['name', 'email', 'message'],
        'newsletter' => ['email'],
        'consultation' => ['name', 'email', 'phone', 'message']
    ];

    if (!isset($requiredFields[$formType])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid form type']);
        exit;
    }

    foreach ($requiredFields[$formType] as $field) {
        if (empty($formData[$field])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => "Missing required field: {$field}"]);
            exit;
        }
    }

    // Validate email format
    if (!filter_var($formData['email'], FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid email format']);
        exit;
    }

    // Initialize PHPMailer
    $mail = new PHPMailer(true);
    
    // Server settings
    $mail->isSMTP();
    $mail->Host = $_ENV['SMTP_HOST'];
    $mail->SMTPAuth = true;
    $mail->Username = $_ENV['SMTP_USERNAME'];
    $mail->Password = $_ENV['SMTP_PASSWORD'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = $_ENV['SMTP_PORT'];

    // Recipients
    $mail->setFrom($_ENV['MAIL_FROM_ADDRESS'], $_ENV['MAIL_FROM_NAME']);
    $mail->addAddress($_ENV['MAIL_TO_ADDRESS'], $_ENV['MAIL_TO_NAME']);
    $mail->addReplyTo($formData['email'], $formData['name'] ?? 'Website Visitor');

    // Email content
    $subject = match($formType) {
        'contact' => 'New Contact Form Submission',
        'newsletter' => 'New Newsletter Subscription',
        'consultation' => 'New Consultation Request',
        default => 'New Website Form Submission'
    };

    $mail->isHTML(true);
    $mail->Subject = $subject;

    // Build email body
    $body = "<h2>{$subject}</h2>";
    $body .= "<p><strong>Submission Time:</strong> " . date('Y-m-d H:i:s') . "</p>";
    
    foreach ($formData as $key => $value) {
        if (!in_array($key, ['form_type', 'recaptcha_token'])) {
            $body .= "<p><strong>" . ucfirst($key) . ":</strong> " . htmlspecialchars($value) . "</p>";
        }
    }

    $mail->Body = $body;
    $mail->AltBody = strip_tags($body);

    // Send email
    $mail->send();

    // Send auto-reply if it's a contact form
    if ($formType === 'contact' || $formType === 'consultation') {
        $autoReply = new PHPMailer(true);
        
        // Server settings
        $autoReply->isSMTP();
        $autoReply->Host = $_ENV['SMTP_HOST'];
        $autoReply->SMTPAuth = true;
        $autoReply->Username = $_ENV['SMTP_USERNAME'];
        $autoReply->Password = $_ENV['SMTP_PASSWORD'];
        $autoReply->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $autoReply->Port = $_ENV['SMTP_PORT'];

        // Recipients
        $autoReply->setFrom($_ENV['MAIL_FROM_ADDRESS'], $_ENV['MAIL_FROM_NAME']);
        $autoReply->addAddress($formData['email'], $formData['name'] ?? 'Website Visitor');

        // Auto-reply content
        $autoReply->isHTML(true);
        $autoReply->Subject = 'Thank you for contacting PsyCare';
        
        $autoReplyBody = "<h2>Thank you for reaching out!</h2>";
        $autoReplyBody .= "<p>We have received your message and will get back to you as soon as possible.</p>";
        $autoReplyBody .= "<p>Best regards,<br>The PsyCare Team</p>";
        
        $autoReply->Body = $autoReplyBody;
        $autoReply->AltBody = strip_tags($autoReplyBody);
        
        $autoReply->send();
    }

    echo json_encode(['success' => true, 'message' => 'Message sent successfully']);

} catch (Exception $e) {
    error_log("Form Error: " . $e->getMessage());
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
    exit();
} 