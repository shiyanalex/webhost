"""Задание 2. Сколько людей и сколько времени.

Запуск из корня репозитория:  python3 src/ex02.py

Функция unicode_lower и класс Median должны остаться на верхнем уровне файла:
src/run_sql.py подключает их к базе, и в заданиях 3–7 ты сможешь писать
в запросах unicode_lower(...) и MEDIAN(...).
"""

import statistics

from db import connect


def unicode_lower(text):
    result = text.lower() if text else ""
    return result

class Median:
    def __init__(self):
        self.values = []

    def step(self, value):
        # TODO: сохрани значение (пропуски None не учитывай)
        if value: self.values.append(value)

    def finalize(self):
        # TODO: верни медиану собранных значений (или None, если их нет)  
        if not self.values: return None

        self.values.sort()
        n = len(self.values)

        if n % 2 == 1:
            return self.values[n // 2]
        else:
            return (self.values[n // 2 - 1] + self.values[n // 2]) / 2


def main():
    con = connect()
    con.create_function("unicode_lower", 1, unicode_lower)
    con.create_aggregate("MEDIAN", 1, Median)

    print("1. Строк в справочнике и людей")
    print(con.execute("SELECT COUNT(*), COUNT(DISTINCT login) FROM agents").fetchone())
    # TODO: COUNT(*) и COUNT(DISTINCT login) в одном запросе, таблица agents

    print("1a. Какая строка лишняя")
    print(con.execute("SELECT * FROM agents GROUP BY id, login, team, hired_at HAVING COUNT(*) > 1").fetchone())
    # TODO: GROUP BY по всем полям справочника + HAVING

    print("2. Смены, где меньше 6 человек")
    print(con.execute("SELECT team, COUNT(*) FROM agents GROUP BY team HAVING COUNT(*) < 6").fetchone())
    # TODO: GROUP BY + HAVING; считай людей, а не строки

    print("3. Каналы в сырой выгрузке: lower()")
    for row in con.execute("SELECT channel, COUNT(*) FROM tickets GROUP BY lower(channel) ORDER BY 1"):
        print(row)
    # TODO: таблица tickets, GROUP BY lower(channel), ORDER BY 1

    print("3a. Каналы в сырой выгрузке: unicode_lower()")
    for row in con.execute("SELECT channel, COUNT(*) FROM tickets GROUP BY unicode_lower(channel) ORDER BY 1"):
        print(row)
    # TODO: то же со своей функцией

    print("4. Время обработки до апреля: среднее и медиана")
    print(con.execute("""
        SELECT ROUND(AVG(handle_min), 1), MEDIAN(handle_min)
        FROM clean
        WHERE period = 'до'
    """).fetchone())
    # TODO: таблица clean, WHERE period = 'до'; ROUND(AVG(handle_min), 1) и MEDIAN(handle_min) в одном запросе
    # Почему они так расходятся и какое число ты назовёшь руководителю:
    # Посмотреть данные, среднее неустойчиво к выплескам, 

    print("5. Медиана: SQL и Python")
    # TODO: та же медиана своей MEDIAN и через statistics.median по значениям из запроса — в одной строке
    sql_median = con.execute(
        "SELECT MEDIAN(handle_min) FROM clean WHERE period = 'до'"
    ).fetchone()[0]

    values = con.execute(
        "SELECT handle_min FROM clean WHERE period = 'до'"
    ).fetchall()

    values = [row[0] for row in values]

    print(sql_median, statistics.median(values))

if __name__ == "__main__":
    main()
