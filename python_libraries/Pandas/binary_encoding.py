#Similar as categorical_data_encoding
import numpy as np
import pandas as pd

df = pd.read_csv("Housing.csv")

binary_col= ['mainroad', 'guestroom', 'basement', 'hotwaterheating', 'airconditioning', 'prefarea']

for col in binary_col:
    df[col]= df[col].map({'yes':1, 'no':0})

print(df.head())