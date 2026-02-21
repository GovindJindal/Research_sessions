import numpy as np
import pandas as pd

df = pd.read_csv("Housing.csv")
df= pd.get_dummies(df, columns=['furnishingstatus'], drop_first=False)

print(df.head())