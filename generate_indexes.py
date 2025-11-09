import pandas as pd
import json
import os

# Cargar el archivo CSV
csv_file = '/home/ubuntu/upload/Laptops(1).csv'
df = pd.read_csv(csv_file)

# Directorio de salida
output_dir = '/home/ubuntu/laptops-catalog/client/public/data'
os.makedirs(output_dir, exist_ok=True)

# Función para limpiar y formatear el texto para slugs
import re
def slugify(text):
    text = str(text).lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    text = re.sub(r'^-+|-+$', '', text)
    return text

# 1. Índice de Marcas
brands = sorted(df['Brand'].unique().tolist())
brands_index = {
    'brands': [{'name': brand, 'slug': slugify(brand)} for brand in brands]
}

# 2. Índice de Sistemas Operativos
os_list = sorted(df['Operating_System'].unique().tolist())
os_index = {
    'os': [{'name': os, 'slug': slugify(os)} for os in os_list]
}

# 3. Índice de Tamaños de Pantalla
screen_sizes = sorted([float(x) for x in df['Screen_Size'].unique() if x != -1])
screen_index = {
    'sizes': [{'size': size, 'slug': slugify(str(size))} for size in screen_sizes]
}

# 4. Índice de Procesadores
processors = sorted(df['Processor'].unique().tolist())
processor_index = {
    'processors': [{'name': proc, 'slug': slugify(proc)} for proc in processors]
}

# Guardar los índices
with open(os.path.join(output_dir, 'brands.json'), 'w', encoding='utf-8') as f:
    json.dump(brands_index, f, ensure_ascii=False, indent=2)

with open(os.path.join(output_dir, 'operating-systems.json'), 'w', encoding='utf-8') as f:
    json.dump(os_index, f, ensure_ascii=False, indent=2)

with open(os.path.join(output_dir, 'screen-sizes.json'), 'w', encoding='utf-8') as f:
    json.dump(screen_index, f, ensure_ascii=False, indent=2)

with open(os.path.join(output_dir, 'processors.json'), 'w', encoding='utf-8') as f:
    json.dump(processor_index, f, ensure_ascii=False, indent=2)

# Crear un archivo de datos maestro con toda la información
all_laptops = []
for index, row in df.iterrows():
    laptop = {
        'id': index,
        'brand': row['Brand'],
        'model': row['Model_Name'],
        'processor': row['Processor'],
        'os': row['Operating_System'],
        'screen_size': float(row['Screen_Size']),
        'touch_screen': row['Touch_Screen'],
        'price': float(row['Price']),
        'storage_mb': int(row['Storage_MB']) if row['Storage_MB'] != -1 else None,
        'ram_gb': int(row['RAM_GB']),
        'slug': slugify(f"{row['Brand']}-{row['Model_Name']}-{index}")
    }
    all_laptops.append(laptop)

with open(os.path.join(output_dir, 'all-laptops.json'), 'w', encoding='utf-8') as f:
    json.dump(all_laptops, f, ensure_ascii=False, indent=2)

print(f"Se han generado los archivos de índices en: {output_dir}")
print(f"- brands.json: {len(brands)} marcas")
print(f"- operating-systems.json: {len(os_list)} sistemas operativos")
print(f"- screen-sizes.json: {len(screen_sizes)} tamaños de pantalla")
print(f"- processors.json: {len(processors)} procesadores")
print(f"- all-laptops.json: {len(all_laptops)} laptops")
