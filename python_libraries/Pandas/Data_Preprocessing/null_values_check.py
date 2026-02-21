#Data-preprocessing
#Step-1 Finding Null Values

import numpy as np
import pandas as pd

df = pd.read_csv("Housing.csv")

print(df.isnull())
print(df.isnull().sum())
