<?php
// Caminho do arquivo
$file = 'pontos.txt';

// Inicializa um array para armazenar os pontos por filho
$pontosPorFilho = [];

// Lê o arquivo linha por linha
if (file_exists($file)) {
    $linhas = file($file);
    foreach ($linhas as $linha) {
        // Extrai os dados da linha
        if (preg_match('/Filho: (\w+), Tarefa: (.+), Pontos: ([+-]?\d+)/', $linha, $matches)) {
            $filho = $matches[1];
            $pontos = (int)$matches[3];

            // Soma os pontos para cada filho
            if (!isset($pontosPorFilho[$filho])) {
                $pontosPorFilho[$filho] = 0;
            }
            $pontosPorFilho[$filho] += $pontos;
        }
    }
}

// Retorna os pontos por filho em formato JSON
header('Content-Type: application/json');
echo json_encode($pontosPorFilho);
?>