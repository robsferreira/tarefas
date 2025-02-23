<?php
// Recebe os dados do JavaScript
$data = json_decode(file_get_contents('php://input'), true);
$filho = $data['filho'];
$tarefa = $data['tarefa'];
$pontos = $data['pontos'];

// Salva os dados em um arquivo (ou banco de dados)
$file = 'pontos.txt';
$current = file_get_contents($file);
$current .= "Filho: $filho, Tarefa: $tarefa, Pontos: $pontos\n";
file_put_contents($file, $current);

echo "Dados salvos com sucesso!";
?>