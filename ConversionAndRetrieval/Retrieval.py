import pymongo
import pandas as pd
import pyodbc

from sqlalchemy import create_engine
from sqlalchemy.engine import URL

SERVER_NAME = 'DESKTOP-J6NGJ2S'
# SERVER_NAME = 'DESKTOP-0UABFVU'  # home
DATABASE_NAME = 'Main_Project'
# DATABASE_NAME = 'MainProject'  # home

connection_string = f"mssql+pyodbc://{SERVER_NAME}/{DATABASE_NAME}?trusted_connection=yes&driver=ODBC+Driver+17+for+SQL+Server"
engine = create_engine(connection_string)

client = pymongo.MongoClient("mongodb+srv://kaustubhgupta9860:kaustubhgupta9860@cluster0.yligz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["test"]
collectionUsers = db["userdatas"]
collectionTrainers = db["trainers"]
collectionTrainings = db["trainings"]
collectionQuiz = db["quizdatas"]
collectionTracker = db["trackers"]

data = []
for x in collectionUsers.find():
    x.pop('_id', None)
    data.append(x)
df = pd.DataFrame(data)
df.to_excel('users_data.xlsx', index=False)
TABLE_NAME = 'users_data'
excel_fileUsers = pd.read_excel('users_data.xlsx', sheet_name=None)
for sheet_name, df_data in excel_fileUsers.items():
    df_data.to_sql(TABLE_NAME, engine, if_exists='replace', index=False)

data = []
for x in collectionTrainers.find():
    x.pop('_id', None)
    data.append(x)
df = pd.DataFrame(data)
df.to_excel('trainers_data.xlsx', index=False)
TABLE_NAME = 'trainers_data'
excel_fileTrainers = pd.read_excel('trainers_data.xlsx', sheet_name=None)
for sheet_name, df_data in excel_fileTrainers.items():
    df_data.to_sql(TABLE_NAME, engine, if_exists='replace', index=False)

data = []
for x in collectionTrainings.find():
    x.pop('_id', None)
    data.append(x)
df = pd.DataFrame(data)
df.to_excel('trainings_data.xlsx', index=False)
TABLE_NAME = 'trainings_data'
excel_fileTrainings = pd.read_excel('trainings_data.xlsx', sheet_name=None)
for sheet_name, df_data in excel_fileTrainings.items():
    df_data.to_sql(TABLE_NAME, engine, if_exists='replace', index=False)

data = []
for x in collectionQuiz.find():
    x.pop('_id', None)
    data.append(x)
df = pd.DataFrame(data)
df.to_excel('quiz_data.xlsx', index=False)
TABLE_NAME = 'quiz_data'
excel_fileQuiz = pd.read_excel('quiz_data.xlsx', sheet_name=None)
for sheet_name, df_data in excel_fileQuiz.items():
    df_data.to_sql(TABLE_NAME, engine, if_exists='replace', index=False)

data = []
for x in collectionTracker.find():
    x.pop('_id', None)
    data.append(x)
df = pd.DataFrame(data)
df.to_excel('tracker_data.xlsx', index=False)
TABLE_NAME = 'tracker_data'
excel_fileTrackers = pd.read_excel('tracker_data.xlsx', sheet_name=None)
for sheet_name, df_data in excel_fileTrackers.items():
    df_data.to_sql(TABLE_NAME, engine, if_exists='replace', index=False)


import pandas as pd
from sqlalchemy import create_engine

# Load the Excel files into pandas DataFrames
df1 = pd.read_excel('users_data.xlsx', index_col=None)
df2 = pd.read_excel('trainers_data.xlsx', index_col=None)
df3 = pd.read_excel('trainings_data.xlsx', index_col=None)
df4 = pd.read_excel('quiz_data.xlsx', index_col=None)
df5 = pd.read_excel('tracker_data.xlsx', index_col=None)

# Create SQLite database engine
engine = create_engine('sqlite:///:memory:')

# Store the DataFrames into the database as tables
df1.to_sql('table1', engine)
df2.to_sql('table2', engine)
df3.to_sql('table3', engine)
df4.to_sql('table4', engine)
df5.to_sql('table5', engine)

# Execute SQL query to join the tables
query = """
select u.userId, u.firstName || ' ' || u.lastName as "Name", u.email, u.gender, u.specializations, u.doj,
u.state,u.experience, t.trainingId, t.trainingName, t.trainerId, table2.trainerName, t.optimizedDuration, tr.trainingStatus, tr.assessment_percentage_done,
tr.assessment_completion_time_in_hours, tr.scoreAchievedInQuiz, tr.quizPassedOrFailed, tr.ratingGivenByTrainer
from table1 u left join table5 tr on u.userId = tr.userId left join table3 t on tr.trainingId = t.trainingId left join table2 on t.trainerId = table2.userId
"""

# Execute the query and load result into a DataFrame
result_df = pd.read_sql_query(query, engine)

result_df.to_excel('AdminUserViewSpecific.xlsx', index=False)

# Convert DataFrame to a list of dictionaries (each dictionary represents a document)
data = result_df.to_dict(orient='records')
collection = db["adminuserviews"]

collection.delete_many({})  # Delete all existing documents in the collection
collection.insert_many(data)