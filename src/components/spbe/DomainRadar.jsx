import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

export default function DomainRadar({ data }) {
  return (
    <div style={{ width: '100%', height: 350 }}>
      <ResponsiveContainer>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" tick={CustomTick}/>
          <PolarRadiusAxis domain={[0, 5]} />
          <Tooltip />
          <Radar dataKey="value" stroke="#6fa3f7" fill="#6fa3f7" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

const CustomTick = ({ payload, x, y, textAnchor }) => {
  const words = payload.value.split(' ');
  const lines = [];

  // Gabung per 2-3 kata agar nggak terlalu panjang ke bawah
  for (let i = 0; i < words.length; i += 3) {
    lines.push(words.slice(i, i + 3).join(' '));
  }

  return (
    <text
      x={x}
      y={y}
      textAnchor={textAnchor}
      dominantBaseline="central"
      fontSize={10}
      fill="#333"
    >
      {lines.map((line, index) => (
        <tspan x={x} dy={index === 0 ? 0 : 10} key={index}>
          {line}
        </tspan>
      ))}
    </text>
  );
};

