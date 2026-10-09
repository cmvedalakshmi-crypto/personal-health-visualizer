from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
import os

app = Flask(__name__)
CORS(app)

DATA_FILE = 'health_data.csv'

# ── Generate default data if no file exists ──────────────────
def get_data():
    if os.path.exists(DATA_FILE):
        df = pd.read_csv(DATA_FILE)
        return df
    else:
        np.random.seed(42)
        dates = pd.date_range(start='2024-01-01', periods=30)
        data = {
            'date': dates.strftime('%Y-%m-%d'),
            'heart_rate': np.random.randint(60, 100, 30).tolist(),
            'sleep_hours': np.round(np.random.uniform(4, 9, 30), 1).tolist(),
            'steps': np.random.randint(2000, 12000, 30).tolist(),
            'calories': np.random.randint(1500, 2500, 30).tolist()
        }
        df = pd.DataFrame(data)
        df.to_csv(DATA_FILE, index=False)
        return df

# ── Anomaly detection ─────────────────────────────────────────
def run_anomaly_detection(df):
    model = IsolationForest(contamination=0.1, random_state=42)
    model.fit(df[['heart_rate', 'sleep_hours', 'steps']])
    df = df.copy()
    df['anomaly'] = model.predict(df[['heart_rate', 'sleep_hours', 'steps']])
    return df

# ── Wellness score ────────────────────────────────────────────
def compute_wellness_score(avg_hr, avg_sleep, avg_steps):
    score = 0
    score += 35 if avg_hr <= 70 else 28 if avg_hr <= 80 else 18 if avg_hr <= 90 else 8
    score += 35 if avg_sleep >= 8 else 28 if avg_sleep >= 7 else 18 if avg_sleep >= 6 else 8
    score += 30 if avg_steps >= 10000 else 22 if avg_steps >= 7000 else 14 if avg_steps >= 5000 else 6
    return score

# ── Correlations ──────────────────────────────────────────────
def compute_correlations(df):
    correlations = []
    matches = sum(
        1 for i in range(len(df) - 1)
        if df.iloc[i]['sleep_hours'] < df['sleep_hours'].mean()
        and df.iloc[i+1]['heart_rate'] > df['heart_rate'].mean()
    )
    correlations.append({
        'label': 'Less sleep → higher heart rate next day',
        'score': round((matches / (len(df) - 1)) * 100),
        'color': '#f43f5e'
    })
    matches2 = sum(
        1 for i in range(len(df) - 1)
        if df.iloc[i]['steps'] > df['steps'].mean()
        and df.iloc[i+1]['sleep_hours'] > df['sleep_hours'].mean()
    )
    correlations.append({
        'label': 'More steps → better sleep quality',
        'score': round((matches2 / (len(df) - 1)) * 100),
        'color': '#34d399'
    })
    return correlations

# ── API: get all health data ──────────────────────────────────
@app.route('/api/health-data')
def get_health_data():
    df = get_data()
    return jsonify(df.to_dict(orient='records'))

# ── API: insights ─────────────────────────────────────────────
@app.route('/api/insights')
def get_insights():
    df = get_data()
    df = run_anomaly_detection(df)
    anomalies_df = df[df['anomaly'] == -1][['date', 'heart_rate', 'sleep_hours', 'steps']]
    avg_hr    = round(df['heart_rate'].mean(), 1)
    avg_sleep = round(df['sleep_hours'].mean(), 1)
    avg_steps = int(df['steps'].mean())
    avg_cal   = int(df['calories'].mean())
    return jsonify({
        'avg_heart_rate':  avg_hr,
        'avg_sleep':       avg_sleep,
        'avg_steps':       avg_steps,
        'avg_calories':    avg_cal,
        'wellness_score':  compute_wellness_score(avg_hr, avg_sleep, avg_steps),
        'correlations':    compute_correlations(df),
        'anomalies':       anomalies_df.to_dict(orient='records'),
        'anomaly_count':   len(anomalies_df)
    })

# ── API: save new entry permanently ──────────────────────────
@app.route('/api/add-entry', methods=['POST'])
def add_entry():
    data = request.get_json()
    new_row = pd.DataFrame([{
        'date':        data['date'],
        'heart_rate':  data['heart_rate'],
        'sleep_hours': data['sleep_hours'],
        'steps':       data['steps'],
        'calories':    data['calories']
    }])
    if os.path.exists(DATA_FILE):
        new_row.to_csv(DATA_FILE, mode='a', header=False, index=False)
    else:
        new_row.to_csv(DATA_FILE, index=False)
    return jsonify({'status': 'saved', 'message': 'Entry saved permanently ✅'})

# ── API: goals ────────────────────────────────────────────────
@app.route('/api/goals')
def get_goals():
    df = get_data()
    return jsonify([
        { 'label': 'Heart Rate',  'current': round(df['heart_rate'].mean(), 1),
          'target': 70,    'unit': 'bpm',   'lowerIsBetter': True  },
        { 'label': 'Sleep',       'current': round(df['sleep_hours'].mean(), 1),
          'target': 8,     'unit': 'hrs',   'lowerIsBetter': False },
        { 'label': 'Daily Steps', 'current': int(df['steps'].mean()),
          'target': 10000, 'unit': 'steps', 'lowerIsBetter': False },
        { 'label': 'Calories',    'current': int(df['calories'].mean()),
          'target': 2500,  'unit': 'kcal',  'lowerIsBetter': False },
    ])

if __name__ == '__main__':
    app.run(debug=True, port=5000)
