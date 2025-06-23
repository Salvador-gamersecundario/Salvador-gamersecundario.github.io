<?php
// update_index.php
// Este script recibe el contenido nuevo y opcionalmente una imagen, y lo escribe en index.html

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $newContent = $_POST['content'] ?? '';
    $imagePath = null;
    // Manejo de imagen si se envía
    if (isset($_FILES['finalImage']) && $_FILES['finalImage']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = '../asset/ING/';
        $fileName = basename($_FILES['finalImage']['name']);
        $targetFile = $uploadDir . $fileName;
        if (move_uploaded_file($_FILES['finalImage']['tmp_name'], $targetFile)) {
            $imagePath = 'asset/ING/' . $fileName;
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al subir la imagen.']);
            exit;
        }
    }
    // Seguridad básica: evita que el contenido esté vacío
    if (!empty($newContent)) {
        $file = '../index.html'; // Ajusta la ruta si es necesario
        // Si se subió imagen, reemplaza la ruta en el HTML
        if ($imagePath) {
            $newContent = preg_replace('/<img src="[^"]*" alt="Chamito" class="final-image" ?\/?>(\s*)/', '<img src="' . $imagePath . '" alt="Chamito" class="final-image">$1', $newContent);
        }
        if (file_put_contents($file, $newContent) !== false) {
            echo json_encode(['success' => true, 'message' => 'index.html actualizado correctamente.', 'imagePath' => $imagePath]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al escribir en index.html.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'El contenido está vacío.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
}
?>
