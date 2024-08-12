import json
import sqlite3
import pandas as pd
import numpy as np

def create_db():
    def get_type(value):
        if isinstance(value, (int, np.integer)):
            return 'INTEGER'
        elif isinstance(value, float):
            return 'REAL'
        else:
            return 'TEXT'

    with open('playlist.json', 'r') as file:
        data = json.load(file)

    df = pd.DataFrame(data)
    columns_name = list(df.columns)
    first_row = df.iloc[0]
    for i in range(len(first_row)):
        columns_name[i] = columns_name[i] + ' ' + get_type(first_row.iloc[i])
    column_sql = '"index" INTEGER PRIMARY KEY, ' + ', '.join(columns_name) + ', rating INTEGER'

    conn = sqlite3.connect('vivpro.db')
    cursor = conn.cursor()

    create_table = f"CREATE TABLE IF NOT EXISTS playlist ({column_sql})"
    cursor.execute(create_table)

    df.to_sql('playlist', conn, if_exists='append', index=True, index_label='index')

    conn.commit()
    cursor.close()
    conn.close()

if __name__ == "__main__":
    create_db()