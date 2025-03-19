import json
import sys

def infer_column_type(value):
    if isinstance(value, bool):
        return "BOOLEAN"
    elif isinstance(value, int):
        return "INTEGER"
    elif isinstance(value, float):
        return "NUMERIC"
    elif isinstance(value, (dict, list)):
        return "JSONB"
    else:
        return "TEXT"

def generate_create_table(table_name, data):
    # Use the first record to derive columns
    first_row = data[0]
    columns = []
    for key, value in first_row.items():
        col_type = infer_column_type(value)
        # Wrap key in double quotes in case of reserved words or special characters
        columns.append(f'"{key}" {col_type}')
    columns_sql = ",\n    ".join(columns)
    create_stmt = f"CREATE TABLE {table_name} (\n    {columns_sql}\n);"
    return create_stmt

def escape_sql_value(value):
    if value is None:
        return "NULL"
    if isinstance(value, (int, float)):
        return str(value)
    if isinstance(value, bool):
        return 'TRUE' if value else 'FALSE'
    # For dicts and lists, store as JSON string
    if isinstance(value, (dict, list)):
        value = json.dumps(value)
    # Escape single quotes by doubling them
    value = str(value).replace("'", "''")
    return f"'{value}'"

def generate_insert_statement(table_name, row):
    keys = list(row.keys())
    columns = ", ".join(f'"{key}"' for key in keys)
    values = ", ".join(escape_sql_value(row[key]) for key in keys)
    stmt = f"INSERT INTO {table_name} ({columns}) VALUES ({values});"
    return stmt

def main(json_file_path, output_sql_file, table_name="my_table"):
    # Load JSON data from file
    with open(json_file_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    if not data:
        print("JSON data is empty.")
        return

    # Generate the CREATE TABLE statement
    create_table_sql = generate_create_table(table_name, data)

    # Open output file and write SQL commands
    with open(output_sql_file, "w", encoding="utf-8") as out:
        out.write("-- Auto-generated SQL file to create and populate table\n")
        out.write(create_table_sql + "\n\n")
        for row in data:
            insert_sql = generate_insert_statement(table_name, row)
            out.write(insert_sql + "\n")

    print(f"SQL file '{output_sql_file}' generated successfully.")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python json_to_postgres.py <input_json_file> <output_sql_file> [table_name]")
        sys.exit(1)
    json_file_path = sys.argv[1]
    output_sql_file = sys.argv[2]
    table_name = sys.argv[3] if len(sys.argv) > 3 else "my_table"
    main(json_file_path, output_sql_file, table_name)
