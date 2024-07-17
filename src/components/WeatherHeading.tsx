import dynamic from 'next/dynamic';

const ClientWeatherHeading = dynamic(() => import('./ClientWeatherHeading'), { ssr: false });

export default function WeatherHeading() {
  return <ClientWeatherHeading />;
}