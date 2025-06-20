import React, { useState } from 'react';
import { propertyAPI } from '../services/api';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import toast from 'react-hot-toast';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface RentAnalysisProps {
  propertyData?: {
    numberOfBedrooms: number;
    numberOfBathrooms: number;
    squareFootage?: number;
    city: string;
    state: string;
    propertyType: string;
    amenities: string[];
    petFriendly: boolean;
    utilitiesIncluded: boolean;
    rent?: number;
  };
  propertyId?: string;
  onRentSuggested?: (suggestedRent: number) => void;
}

interface RentAnalysisResult {
  suggestedRent: number;
  confidence: 'high' | 'medium' | 'low';
  reasoning: string;
  marketComparison: {
    aboveMarket: boolean;
    percentageDifference: number;
  };
  recommendations: string[];
}

const RentAnalysis: React.FC<RentAnalysisProps> = ({ propertyData, propertyId, onRentSuggested }) => {
  const [analysis, setAnalysis] = useState<RentAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyzeRent = async () => {
    // Basic validation
    if (!propertyData?.city || !propertyData?.state || !propertyData?.numberOfBedrooms || !propertyData?.numberOfBathrooms) {
      toast.error('Please fill in all required fields for rent analysis (city, state, beds, baths).');
      return;
    }

    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      let response;
      if (propertyId) {
        response = await propertyAPI.analyzeRent(propertyId);
      } else if (propertyData) {
        response = await propertyAPI.analyzeNewPropertyRent(propertyData);
      } else {
        throw new Error('No property data provided');
      }

      if (response.data.success) {
        setAnalysis(response.data.analysis);
        toast.success('Rent analysis complete!');
        
        if (onRentSuggested) {
          onRentSuggested(response.data.analysis.suggestedRent);
        }
      } else {
        setError(response.data.error || 'Failed to analyze rent price.');
        toast.error(response.data.error || 'Failed to analyze rent price.');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'An unexpected error occurred.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getConfidenceIcon = (confidence: string) => {
    switch (confidence) {
      case 'high': return '✓';
      case 'medium': return '⚠';
      case 'low': return '?';
      default: return '•';
    }
  };

  const chartData = {
    labels: ['Suggested Rent', 'Your Current Rent'],
    datasets: [
      {
        label: 'Rent Comparison ($)',
        data: [
          analysis?.suggestedRent || 0,
          propertyData?.rent || 0,
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Rent Price Analysis',
      },
    },
    scales: {
        y: {
            beginAtZero: true
        }
    }
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold">AI Rent Analysis</h3>
        <button
          onClick={handleAnalyzeRent}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg disabled:bg-gray-500"
        >
          {loading ? 'Analyzing...' : 'Analyze Rent'}
        </button>
      </div>

      <div className="bg-gray-700 p-4 rounded-md min-h-[300px] flex items-center justify-center">
        {loading && <p className="text-lg">Loading analysis...</p>}
        {error && <p className="text-red-400 text-lg">{error}</p>}
        
        {analysis && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div className="p-4 bg-gray-600 rounded-lg">
                <h4 className="text-xl font-semibold mb-2">Analysis Results</h4>
                <p><strong>Suggested Rent:</strong> <span className="text-green-400 font-bold">${analysis.suggestedRent.toLocaleString()}</span></p>
                <p><strong>Confidence:</strong> <span className="capitalize">{analysis.confidence}</span></p>
                <p className="mt-2"><strong>Reasoning:</strong> {analysis.reasoning}</p>
                
                <h5 className="font-semibold mt-4">Recommendations:</h5>
                <ul className="list-disc list-inside">
                    {analysis.recommendations.map((rec, i) => (
                        <li key={i}>{rec}</li>
                    ))}
                </ul>
            </div>
            <div className="p-4 bg-gray-600 rounded-lg">
              <Bar options={chartOptions} data={chartData} />
            </div>
          </div>
        )}

        {!analysis && !loading && !error && (
            <p className="text-gray-400">Click "Analyze Rent" to get an AI-powered rent estimate.</p>
        )}
      </div>
    </div>
  );
};

export default RentAnalysis; 