import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {setNightMode} from "@/redux/reducers/modeSlice";
import {Clock, Cloud, Droplets, Loader, MapPin, Thermometer, Wind} from "lucide-react";
import {useDraggable} from "@dnd-kit/core";
import {CSS} from '@dnd-kit/utilities';

interface Location {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
}

interface Current {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: {
        text: string;
        icon: string;
        code: number;
    };
    wind_mph: number;
    wind_kph: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
}

interface WeatherData {
    location: Location;
    current: Current;
}

interface WeatherTrackingProps {
    className?: string;
    style?: React.CSSProperties;
}

const WeatherTracking: React.FC<WeatherTrackingProps> = ({className, style}) => {
    const [astronomy, setAstronomy] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const dispatch = useDispatch();

    const base_weather_url: string = 'https://api.weatherapi.com/v1';
    const apiKey = 'e1884132e32d42198b7154625242410';

    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: 'draggable',
    });

    const dragStyle = {
        ...style,
        transform: CSS.Translate.toString(transform),
    };


    useEffect(() => {
        const controller = new AbortController();

        const fetchWeather = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const res = await fetch(
                    `${base_weather_url}/current.json?key=${apiKey}&q=vietnam`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        signal: controller.signal
                    }
                );

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data: WeatherData = await res.json();
                setAstronomy(data);
            } catch (err) {
                if (err instanceof Error) {
                    if (err.name === 'AbortError') {
                        console.log('Fetch aborted');
                        return;
                    }
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchWeather().catch(err => {
            console.error('Error in fetchWeather:', err);
            setError('Failed to fetch weather data');
            setIsLoading(false);
        });

        return () => {
            controller.abort();
        };
    }, []);

    useEffect(() => {
        astronomy?.current.is_day ? dispatch(setNightMode(false)) : dispatch(setNightMode(true));
    }, [astronomy]);

    if (isLoading) {
        return (
            <div className="fixed z-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Loader className="animate-spin" size={24}/>
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="fixed z-40 bg-red-500 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg text-white">
                <div className="flex items-center gap-2">
                    <Cloud size={20}/>
                    <span>{error}</span>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={dragStyle}
            {...attributes}
            {...listeners}
            className={`absolute z-20 pointer-events-auto top-0 left-0 glass-card p-6 rounded-lg text-white min-w-[320px] ${className || ''}`}>
            {astronomy && (
                <div className="space-y-2">
                    {/* Location Header */}
                    <div className="flex items-center gap-2">
                        <MapPin size={20}/>
                        <h2 className="text-xl font-semibold">
                            {astronomy.location.name}, {astronomy.location.country}
                        </h2>
                    </div>

                    {/* Main Temperature Display */}
                    <div className="flex items-center gap-2">
                        <div className="space-y-1">
                            <div className="text-4xl font-bold">
                                {astronomy.current.temp_c}°C
                            </div>
                            <div className="text-lg">
                                {astronomy.current.condition.text}
                            </div>
                        </div>
                        <img
                            src={astronomy.current.condition.icon}
                            alt={astronomy.current.condition.text}
                            className="w-16 h-16"
                        />
                    </div>

                    <div className="border-t border-white/20 my-4"/>

                    {/* Weather Details Grid */}
                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2">
                            <Thermometer size={18}/>
                            <span>Feels: {astronomy.current.feelslike_c}°C</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Wind size={18}/>
                            <span>Wind: {astronomy.current.wind_kph} km/h</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Droplets size={18}/>
                            <span>Humidity: {astronomy.current.humidity}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Cloud size={18}/>
                            <span>Cloud: {astronomy.current.cloud}%</span>
                        </div>
                    </div>

                    {/* Last Updated */}
                    <div className="flex items-center gap-2 text-sm opacity-80">
                        <Clock size={16}/>
                        <span>Last Updated: {astronomy.current.last_updated}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherTracking;