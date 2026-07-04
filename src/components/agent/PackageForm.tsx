import React, { useState } from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import Button from '../common/Button';
import { TravelPackage, ItineraryDay } from '../../types';

interface PackageFormProps {
  initialData?: Partial<TravelPackage>;
  onSubmit: (data: Partial<TravelPackage>) => void;
  isLoading?: boolean;
}

const PackageForm: React.FC<PackageFormProps> = ({
  initialData = {},
  onSubmit,
  isLoading = false,
}) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [destination, setDestination] = useState(initialData.destination || '');
  const [duration, setDuration] = useState(initialData.duration || 1);
  const [price, setPrice] = useState(initialData.price || 0);
  const [imageUrl, setImageUrl] = useState(initialData.imageUrl || '');
  const [inclusions, setInclusions] = useState<string[]>(initialData.inclusions || ['']);
  const [exclusions, setExclusions] = useState<string[]>(initialData.exclusions || ['']);
  const [itinerary, setItinerary] = useState<Partial<ItineraryDay>[]>(
    initialData.itinerary || [{ day: 1, title: '', description: '' }]
  );
  const [featured, setFeatured] = useState(initialData.featured || false);
  
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!title || !description || !destination || duration < 1 || price < 1 || !imageUrl) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Clean up empty inclusions/exclusions
    const filteredInclusions = inclusions.filter(item => item.trim() !== '');
    const filteredExclusions = exclusions.filter(item => item.trim() !== '');
    
    // Clean up incomplete itinerary days
    const filteredItinerary = itinerary
      .filter(day => day.title && day.description)
      .map((day, index) => ({
        ...day,
        day: index + 1,
      })) as ItineraryDay[];
    
    const packageData: Partial<TravelPackage> = {
      ...initialData,
      title,
      description,
      destination,
      duration,
      price,
      imageUrl,
      inclusions: filteredInclusions,
      exclusions: filteredExclusions,
      itinerary: filteredItinerary,
      featured,
    };
    
    onSubmit(packageData);
  };
  
  const handleInclusionChange = (index: number, value: string) => {
    const newInclusions = [...inclusions];
    newInclusions[index] = value;
    setInclusions(newInclusions);
  };
  
  const handleAddInclusion = () => {
    setInclusions([...inclusions, '']);
  };
  
  const handleRemoveInclusion = (index: number) => {
    const newInclusions = [...inclusions];
    newInclusions.splice(index, 1);
    setInclusions(newInclusions);
  };
  
  const handleExclusionChange = (index: number, value: string) => {
    const newExclusions = [...exclusions];
    newExclusions[index] = value;
    setExclusions(newExclusions);
  };
  
  const handleAddExclusion = () => {
    setExclusions([...exclusions, '']);
  };
  
  const handleRemoveExclusion = (index: number) => {
    const newExclusions = [...exclusions];
    newExclusions.splice(index, 1);
    setExclusions(newExclusions);
  };
  
  const handleItineraryChange = (index: number, field: keyof ItineraryDay, value: string | number) => {
    const newItinerary = [...itinerary];
    newItinerary[index] = {
      ...newItinerary[index],
      [field]: value,
    };
    setItinerary(newItinerary);
  };
  
  const handleAddItineraryDay = () => {
    setItinerary([
      ...itinerary,
      { day: itinerary.length + 1, title: '', description: '' },
    ]);
  };
  
  const handleRemoveItineraryDay = (index: number) => {
    const newItinerary = [...itinerary];
    newItinerary.splice(index, 1);
    // Update day numbers
    newItinerary.forEach((day, i) => {
      day.day = i + 1;
    });
    setItinerary(newItinerary);
  };
  
  return (
    <form onSubmit={handleSubmitForm} className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Package Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="e.g., Bali Paradise Escape"
              required
            />
          </div>
          
          <div className="col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description *
            </label>
            <textarea
              id="description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Describe the package in detail..."
              required
            />
          </div>
          
          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
              Destination *
            </label>
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="e.g., Bali, Indonesia"
              required
            />
          </div>
          
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
              Cover Image URL *
            </label>
            <input
              type="url"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>
          
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
              Duration (days) *
            </label>
            <input
              type="number"
              id="duration"
              min={1}
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value, 10))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
          
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price (₹) *
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">₹</span>
              </div>
              <input
                type="number"
                id="price"
                min={1}
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value, 10))}
                className="mt-1 block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="0.00"
                required
              />
            </div>
          </div>
          
          <div className="col-span-2">
            <div className="flex items-center">
              <input
                id="featured"
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm font-medium text-gray-700">
                Featured Package (will be highlighted on the homepage)
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Inclusions & Exclusions</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Inclusions
            </label>
            {inclusions.map((inclusion, index) => (
              <div key={`inclusion-${index}`} className="flex items-center mb-2">
                <input
                  type="text"
                  value={inclusion}
                  onChange={(e) => handleInclusionChange(index, e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="e.g., Hotel accommodation"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveInclusion(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                  disabled={inclusions.length <= 1}
                >
                  <MinusCircle className="h-5 w-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddInclusion}
              className="mt-2 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              <PlusCircle className="h-5 w-5 mr-1" />
              Add Inclusion
            </button>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Exclusions
            </label>
            {exclusions.map((exclusion, index) => (
              <div key={`exclusion-${index}`} className="flex items-center mb-2">
                <input
                  type="text"
                  value={exclusion}
                  onChange={(e) => handleExclusionChange(index, e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="e.g., International flights"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveExclusion(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                  disabled={exclusions.length <= 1}
                >
                  <MinusCircle className="h-5 w-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddExclusion}
              className="mt-2 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              <PlusCircle className="h-5 w-5 mr-1" />
              Add Exclusion
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Itinerary</h3>
        
        <div className="space-y-6">
          {itinerary.map((day, index) => (
            <div key={`day-${index}`} className="p-4 border border-gray-200 rounded-md">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-md font-medium">Day {day.day}</h4>
                <button
                  type="button"
                  onClick={() => handleRemoveItineraryDay(index)}
                  className="text-red-500 hover:text-red-700"
                  disabled={itinerary.length <= 1}
                >
                  <MinusCircle className="h-5 w-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={day.title || ''}
                    onChange={(e) => handleItineraryChange(index, 'title', e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="e.g., Arrival Day"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={day.description || ''}
                    onChange={(e) => handleItineraryChange(index, 'description', e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Describe the activities for this day..."
                  />
                </div>
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={handleAddItineraryDay}
            className="mt-2 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            <PlusCircle className="h-5 w-5 mr-1" />
            Add Day
          </button>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button
          type="submit"
          isLoading={isLoading}
          size="lg"
        >
          {initialData.id ? 'Update Package' : 'Create Package'}
        </Button>
      </div>
    </form>
  );
};

export default PackageForm;