"""Задание 1. Первые запросы.

Запуск из корня репозитория:  python3 src/ex01.py
"""

import csv
import sqlite3

# --- Загрузка CSV в базу -------------------------------------------------
# SQLite умеет держать базу прямо в памяти процесса — файл на диске не нужен.
con = sqlite3.connect(":memory:")
cur = con.cursor()

# 1. Создаём пустую таблицу: имя таблицы, имена полей и их тип.
#    Все поля текстовые (TEXT) — так же, как они лежат в CSV.
cur.execute("""
CREATE TABLE agents (
    id TEXT,
    login TEXT,
    team TEXT,       -- смена
    hired_at TEXT
)
""")

# 2. Читаем CSV: каждая строка файла превращается в кортеж из четырёх значений.
with open("data/agents.csv", encoding="utf-8") as f:
    rows = [
        (r["id"], r["login"], r["team"], r["hired_at"])
        for r in csv.DictReader(f)
    ]

# 3. Вставляем все кортежи в таблицу одной командой.
#    Знаки ? — места, куда sqlite3 подставит значения из кортежа.
cur.executemany("INSERT INTO agents VALUES (?, ?, ?, ?)", rows)
con.commit()

# --- Запросы --------------------------------------------------------------
# Формат вывода: строка «номер. название», под ней результат как есть — кортежами.

print("1. Первые три сотрудника")
for row in cur.execute("SELECT login, team FROM agents LIMIT 3"):
    print(row)

print("2. Количество строк в справочнике")
print(con.execute("SELECT COUNT(*) FROM agents").fetchone())

print("3. Три сотрудника, нанятых раньше всех")
for row in con.execute("SELECT login, hired_at FROM agents ORDER BY hired_at LIMIT 3"):
    print(row)

print("4. Количество строк по каждой смене")
for row in con.execute("SELECT team, COUNT(*) FROM agents GROUP BY team"):
    print(row)

print("5. Сотрудники, нанятые в 2025 году")
for row in con.execute("SELECT login, hired_at FROM agents WHERE hired_at >= '2025-01-01'"):
    print(row)