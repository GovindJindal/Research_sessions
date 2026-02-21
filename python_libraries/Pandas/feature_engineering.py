import numpy as np
import pandas as pd

df = pd.read_csv("Housing.csv")

## separating numerical data from the categorical data

num_cols = df.select_dtypes(include=['int64', 'float64']).columns
print(num_cols)
#Index(['price', 'area', 'bedrooms', 'bathrooms', 'stories', 'parking'], dtype='str')

cat_cols = df.select_dtypes(include=['object']).columns
print(cat_cols)
# Index(['mainroad', 'guestroom', 'basement', 'hotwaterheating',
#        'airconditioning', 'prefarea', 'furnishingstatus'],
#       dtype='str')

for col in cat_cols:
    print(col, '->' ,df[col].nunique())