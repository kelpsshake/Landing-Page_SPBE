'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from 'recharts';

import { useState } from 'react';

// Data SPBE per domain dari 2021–2024
const domainData = [
  { domain: 'Kebijakan Internal', 2021: 3.4, 2022: 3, 2023: 4, 2024: 4.6 },
  { domain: 'Tata Kelola', 2021: 2.9, 2022: 2.8, 2023: 3.1, 2024: 3.7 },
  { domain: 'Manajemen SPBE', 2021: 2.64, 2022: 1.27, 2023: 2.36, 2024: 2.45 },
  { domain: 'Layanan SPBE', 2021: 3.03, 2022: 3.3, 2023: 3.95, 2024: 4.51 },
];

// Data indeks final (rata-rata total semua domain)
const indeksFinalData = [
  { year: 2021, score: 2.98 },
  { year: 2022, score: 2.81 },
  { year: 2023, score: 3.48 },
  { year: 2024, score: 3.98 },
];

// Hitung rata-rata & ranking berdasarkan semua tahun
const rankData = domainData
  .map((item) => {
    const years = [2021, 2022, 2023, 2024];
    const average =
      years.reduce((sum, year) => sum + item[year], 0) / years.length;

    return {
      domain: item.domain,
      score: average.toFixed(2),
    };
  })
  .sort((a, b) => b.score - a.score)
  .map((item, index) => ({
    ...item,
    rank: index + 1,
  }));

export default function CombinedLineChart() {
  const [showFinal, setShowFinal] = useState(true);

  return (
    <div className="w-full px-4 py-10 space-y-12">
      {/* Grafik per domain */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="w-full lg:w-2/3 h-[400px]">
          <ResponsiveContainer>
            <LineChart data={domainData} margin={{ top: 30, right: 20, bottom: 5, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="domain" tick={{ fontSize: 12 }} />
              <YAxis domain={[1, 5]} tick={{ fontSize: 12 }}>
                <Label value="Skor Indeks" angle={-90} position="insideLeft" offset={-5} />
              </YAxis>
              <Tooltip />
              <Legend />

              <Line type="monotone" dataKey="2021" stroke="#A0AEC0" strokeWidth={2} />
              <Line type="monotone" dataKey="2022" stroke="#6FA3F7" strokeWidth={2} />
              <Line type="monotone" dataKey="2023" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="2024" stroke="#1E3A8A" strokeWidth={3} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Insight Box */}
        <div className="w-full lg:w-1/3 space-y-4">
          {rankData.map((item, i) => (
            <div
              key={i}
              className="bg-white border shadow-sm rounded-xl px-4 py-3"
            >
              <h4 className="text-sm font-medium text-slate-500">{item.domain}</h4>
              <p className="text-xl font-bold text-blue-600">
                Skor Rata-rata: {item.score}
              </p>
              <p className="text-sm font-semibold text-gray-700">
                Peringkat {item.rank} (berdasarkan 2021–2024)
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Grafik Indeks Final */}
      {showFinal && (
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Perbandingan Indeks Final SPBE (2021–2024)</h3>
          <div className="w-full h-[320px]">
            <ResponsiveContainer>
              <LineChart data={indeksFinalData} margin={{ top: 20, right: 20, bottom: 5, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis domain={[2.5, 4.5]} tick={{ fontSize: 12 }}>
                  <Label value="Skor Final" angle={-90} position="insideLeft" offset={-5} />
                </YAxis>
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="score" name="Indeks Final" stroke="#0F172A" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
