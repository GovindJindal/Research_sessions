#Step-2 Duplicates Removal

import numpy as np
import pandas as pd

df = pd.read_csv("Housing.csv")

print(df.duplicated())
print(df.duplicated().sum())
print(df.drop_duplicates().sum())