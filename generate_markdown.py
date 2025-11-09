import pandas as pd
import os
import re

# Nombre del archivo CSV
csv_file = '/home/ubuntu/upload/Laptops(1).csv'
# Directorio de salida para los archivos Markdown
output_dir = '/home/ubuntu/laptops_markdown'

# Crear el directorio de salida si no existe
os.makedirs(output_dir, exist_ok=True)

# Cargar el archivo CSV
df = pd.read_csv(csv_file)

# Función para limpiar y formatear el texto para slugs
def slugify(text):
    text = str(text).lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    text = re.sub(r'^-+|-+$', '', text)
    return text

# Iterar sobre cada fila del DataFrame
for index, row in df.iterrows():
    # Campos para el frontmatter (YAML)
    frontmatter = f"""---
title: "{row['Brand']} {row['Model_Name']}"
brand: "{row['Brand']}"
model: "{row['Model_Name']}"
processor: "{row['Processor']}"
os: "{row['Operating_System']}"
screen_size: "{row['Screen_Size']}"
touch_screen: "{row['Touch_Screen']}"
price: {row['Price']}
storage_mb: {row['Storage_MB']}
ram_gb: {row['RAM_GB']}
---

# {row['Brand']} {row['Model_Name']}

## Especificaciones Técnicas

| Característica | Valor |
| :--- | :--- |
| **Marca** | {row['Brand']} |
| **Modelo** | {row['Model_Name']} |
| **Procesador** | {row['Processor']} |
| **Sistema Operativo** | {row['Operating_System']} |
| **Almacenamiento (MB)** | {row['Storage_MB']} |
| **RAM (GB)** | {row['RAM_GB']} |
| **Tamaño de Pantalla (cm)** | {row['Screen_Size']} |
| **Pantalla Táctil** | {row['Touch_Screen']} |
| **Precio (USD)** | {row['Price']} |

"""
    
    # Crear un nombre de archivo único y amigable
    filename = slugify(f"{row['Brand']}-{row['Model_Name']}-{index}")
    file_path = os.path.join(output_dir, f"{filename}.md")
    
    # Escribir el contenido en el archivo Markdown
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(frontmatter)

print(f"Se han generado {len(df)} archivos Markdown en el directorio: {output_dir}")
