<?php
// Caminho do arquivo
$file = 'pontos.txt';

// Limpa o conteúdo do arquivo
file_put_contents($file, '');

echo "Pontos resetados com sucesso!";
?>