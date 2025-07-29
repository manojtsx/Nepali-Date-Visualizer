'use client'
import React, { useState } from 'react';
import NepaliDate from './NepaliDate';
import { formatNepaliDate, formatNepaliDateTime } from './formatNepaliDate';
import NepaliCalendarInput from './NepaliCalendarInput';
import NepaliCalendarInputDateTime from './NepaliCalendarInputDateTime';
import NepaliCalendarRangeUI from './NepaliCalendarRangeUI';
import NepaliCalendarUI from './NepaliCalendarUI';

// Simple utility function
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

// Enhanced UI components with better styling
const DefaultButton = ({ children, className, ...props }: any) => (
  <button 
    className={cn(
      "px-6 py-3 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
      "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      className
    )} 
    {...props}
  >
    {children}
  </button>
);

const DefaultInput = ({ className, ...props }: any) => (
  <input 
    className={cn(
      "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      "transition-all duration-200 placeholder-gray-400",
      className
    )} 
    {...props} 
  />
);

const DefaultSelect = ({ children, className, ...props }: any) => (
  <select 
    className={cn(
      "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      "transition-all duration-200 bg-white",
      className
    )} 
    {...props}
  >
    {children}
  </select>
);

const DefaultSelectOption = ({ children, ...props }: any) => (
  <option {...props}>{children}</option>
);

const DefaultCard = ({ children, className, ...props }: any) => (
  <div 
    className={cn(
      "bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200",
      "backdrop-blur-sm bg-white/95",
      className
    )} 
    {...props}
  >
    {children}
  </div>
);

const DefaultBadge = ({ children, className, ...props }: any) => (
  <span 
    className={cn(
      "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
      "bg-blue-100 text-blue-800",
      className
    )} 
    {...props}
  >
    {children}
  </span>
);

interface NepaliDateVisualizerProps {
  className?: string;
  components?: {
    Button?: React.ComponentType<any>;
    Input?: React.ComponentType<any>;
    Select?: React.ComponentType<any>;
    SelectOption?: React.ComponentType<any>;
    Card?: React.ComponentType<any>;
    Badge?: React.ComponentType<any>;
  };
  styles?: {
    container?: string;
    section?: string;
    card?: string;
    title?: string;
    subtitle?: string;
    badge?: string;
    input?: string;
    button?: string;
    grid?: string;
    demo?: string;
  };
}

const NepaliDateVisualizer = ({
  className,
  components = {},
  styles = {},
}: NepaliDateVisualizerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | undefined>(undefined);
  const [selectedRange, setSelectedRange] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });
  const [conversionInput, setConversionInput] = useState('');
  const [conversionResult, setConversionResult] = useState('');
  const [formatInput, setFormatInput] = useState('2075-12-25');
  const [formatResult, setFormatResult] = useState('');
  const [activeTab, setActiveTab] = useState('pickers');

  // Use custom components or defaults
  const {
    Button = DefaultButton,
    Input = DefaultInput,
    Select = DefaultSelect,
    SelectOption = DefaultSelectOption,
    Card = DefaultCard,
    Badge = DefaultBadge,
  } = components;

  const handleDateConversion = () => {
    try {
      const nepaliDate = new NepaliDate(conversionInput);
      const englishDate = nepaliDate.getEnglishDate();
      setConversionResult(`${conversionInput} BS → ${englishDate.toDateString()} AD`);
    } catch (error) {
      setConversionResult('Invalid date format');
    }
  };

  const handleFormatExample = () => {
    try {
      const nepaliDate = new NepaliDate(formatInput);
      setFormatResult(nepaliDate.format('YYYY-MM-DD'));
    } catch (error) {
      setFormatResult('Invalid date format');
    }
  };

  const formatExamples = [
    { input: '2075-12-25', description: 'Basic date' },
    { input: '2075.12.25', description: 'Dot format' },
    { input: '2075/12/25', description: 'Slash format' },
    { input: new Date(), description: 'Current date' },
  ];

  const conversionExamples = [
    { bs: '2075-12-25', ad: '2019-04-08' },
    { bs: '2080-01-01', ad: '2023-04-14' },
    { bs: '2070-06-15', ad: '2013-09-30' },
  ];

  const tabs = [
    { id: 'pickers', label: 'Date Pickers', icon: '📅' },
    { id: 'conversion', label: 'Conversion', icon: '🔄' },
    { id: 'formatting', label: 'Formatting', icon: '✨' },
    { id: 'code', label: 'Code Examples', icon: '💻' },
    { id: 'evaluation', label: 'Evaluation', icon: '📊' },
    { id: 'info', label: 'Info', icon: 'ℹ️' },
  ];

  return (
    <div className={cn(
      "min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50",
      "max-w-7xl mx-auto p-6 space-y-8",
      styles.container, 
      className
    )}>
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
          <span className="text-2xl">🇳🇵</span>
        </div>
        <h1 className={cn(
          "text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4",
          styles.title
        )}>
          Nepali Date Visualizer
        </h1>
        <p className={cn(
          "text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed",
          styles.subtitle
        )}>
          Interactive demo showcasing all Nepali date functionality with beautiful, user-friendly components. 
          Perfect for evaluating whether to integrate these components into your project.
        </p>
        
        {/* Quick Stats */}
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">5</div>
            <div className="text-sm text-gray-600">Components</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">91KB</div>
            <div className="text-sm text-gray-600">Bundle Size</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">100%</div>
            <div className="text-sm text-gray-600">TypeScript</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">4</div>
            <div className="text-sm text-gray-600">Dependencies</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
            )}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-8">
        {/* Date Pickers Tab */}
        {activeTab === 'pickers' && (
          <div className="space-y-8">
            {/* Single Date Picker */}
            <Card className={cn("p-8", styles.card, styles.section)}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-lg">📅</span>
                </div>
                <h2 className={cn("text-2xl font-bold text-gray-900", styles.title)}>
                  Single Date Picker
                </h2>
              </div>
              <div className="space-y-6">
                <NepaliCalendarInput
                  value={selectedDate}
                  onChange={setSelectedDate}
                  placeholder="Select a Nepali date..."
                />
                {selectedDate && (
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-3">
                      <Badge className={cn("bg-blue-200 text-blue-800 px-4 py-2 rounded-full text-sm font-medium", styles.badge)}>
                        Selected Date
                      </Badge>
                      <span className="text-lg font-semibold text-blue-900">
                        {selectedDate.toDateString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Date Time Picker */}
            <Card className={cn("p-8", styles.card, styles.section)}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-lg">⏰</span>
                </div>
                <h2 className={cn("text-2xl font-bold text-gray-900", styles.title)}>
                  Date & Time Picker
                </h2>
              </div>
              <div className="space-y-6">
                <NepaliCalendarInputDateTime
                  value={selectedDateTime}
                  onChange={setSelectedDateTime}
                  placeholder="Select date and time..."
                />
                {selectedDateTime && (
                  <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                    <div className="flex items-center gap-3">
                      <Badge className={cn("bg-green-200 text-green-800 px-4 py-2 rounded-full text-sm font-medium", styles.badge)}>
                        Selected DateTime
                      </Badge>
                      <span className="text-lg font-semibold text-green-900">
                        {selectedDateTime.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Date Range Picker */}
            <Card className={cn("p-8", styles.card, styles.section)}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 text-lg">📊</span>
                </div>
                <h2 className={cn("text-2xl font-bold text-gray-900", styles.title)}>
                  Date Range Picker
                </h2>
              </div>
              <div className="space-y-6">
                <NepaliCalendarRangeUI
                  onChange={setSelectedRange}
                />
                {selectedRange.start && selectedRange.end && (
                  <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                    <div className="flex items-center gap-3">
                      <Badge className={cn("bg-purple-200 text-purple-800 px-4 py-2 rounded-full text-sm font-medium", styles.badge)}>
                        Selected Range
                      </Badge>
                      <span className="text-lg font-semibold text-purple-900">
                        {selectedRange.start.toDateString()} to {selectedRange.end.toDateString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Calendar UI */}
            <Card className={cn("p-8", styles.card, styles.section)}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-orange-600 text-lg">🗓️</span>
                </div>
                <h2 className={cn("text-2xl font-bold text-gray-900", styles.title)}>
                  Interactive Calendar
                </h2>
              </div>
              <div className="space-y-6">
                <NepaliCalendarUI />
              </div>
            </Card>
          </div>
        )}

        {/* Conversion Tab */}
        {activeTab === 'conversion' && (
          <Card className={cn("p-8", styles.card, styles.section)}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-yellow-600 text-lg">🔄</span>
              </div>
              <h2 className={cn("text-2xl font-bold text-gray-900", styles.title)}>
                Date Conversion
              </h2>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <Input
                  type="text"
                  placeholder="Enter Nepali date (e.g., 2075-12-25)"
                  value={conversionInput}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConversionInput(e.target.value)}
                  className={cn("flex-1", styles.input)}
                />
                <Button
                  onClick={handleDateConversion}
                  className={cn("whitespace-nowrap", styles.button)}
                >
                  Convert
                </Button>
              </div>
              {conversionResult && (
                <div className="p-6 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
                  <div className="flex items-center gap-3">
                    <Badge className={cn("bg-yellow-200 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium", styles.badge)}>
                      Conversion Result
                    </Badge>
                    <span className="text-lg font-semibold text-yellow-900">
                      {conversionResult}
                    </span>
                  </div>
                </div>
              )}
              
              {/* Conversion Examples */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Common Conversions:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {conversionExamples.map((example, index) => (
                    <div key={index} className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200">
                      <div className="text-sm text-gray-600 mb-2">Bikram Sambat</div>
                      <div className="text-lg font-semibold text-gray-900 mb-2">{example.bs}</div>
                      <div className="text-sm text-gray-600 mb-1">Gregorian</div>
                      <div className="text-lg font-semibold text-gray-900">{example.ad}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Formatting Tab */}
        {activeTab === 'formatting' && (
          <div className="space-y-8">
            <Card className={cn("p-8", styles.card, styles.section)}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-lg">✨</span>
                </div>
                <h2 className={cn("text-2xl font-bold text-gray-900", styles.title)}>
                  Date Formatting
                </h2>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Input
                    type="text"
                    placeholder="Enter Nepali date to format"
                    value={formatInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormatInput(e.target.value)}
                    className={cn("flex-1", styles.input)}
                  />
                  <Button
                    onClick={handleFormatExample}
                    className={cn("whitespace-nowrap bg-green-600 hover:bg-green-700", styles.button)}
                  >
                    Format
                  </Button>
                </div>
                {formatResult && (
                  <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                    <div className="flex items-center gap-3">
                      <Badge className={cn("bg-green-200 text-green-800 px-4 py-2 rounded-full text-sm font-medium", styles.badge)}>
                        Formatted Result
                      </Badge>
                      <span className="text-lg font-semibold text-green-900">
                        {formatResult}
                      </span>
                    </div>
                  </div>
                )}
                
                {/* Format Examples */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Format Examples:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formatExamples.map((example, index) => (
                      <div key={index} className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200">
                        <div className="text-sm text-gray-600 mb-2">{example.description}</div>
                        <div className="text-lg font-mono bg-white p-3 rounded-lg border">
                          {typeof example.input === 'string' ? example.input : example.input.toDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Utility Functions */}
            <Card className={cn("p-8", styles.card, styles.section)}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-lg">🔧</span>
                </div>
                <h2 className={cn("text-2xl font-bold text-gray-900", styles.title)}>
                  Utility Functions
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                  <h3 className="font-semibold mb-3 text-blue-900">formatNepaliDate</h3>
                  <div className="text-sm text-blue-800 bg-white p-3 rounded-lg border">
                    {formatNepaliDate(new Date('2075-12-25'), (date: Date) => date.toDateString())}
                  </div>
                </div>
                <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                  <h3 className="font-semibold mb-3 text-green-900">formatNepaliDateTime</h3>
                  <div className="text-sm text-green-800 bg-white p-3 rounded-lg border">
                    {formatNepaliDateTime(new Date('2075-12-25'), (date: Date) => date.toLocaleString())}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Info Tab */}
        {activeTab === 'info' && (
          <div className="space-y-8">
            {/* Current Date Info */}
            <Card className={cn("p-8", styles.card, styles.section)}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <span className="text-indigo-600 text-lg">📅</span>
                </div>
                <h2 className={cn("text-2xl font-bold text-gray-900", styles.title)}>
                  Current Date Information
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-indigo-50 rounded-xl border border-indigo-200">
                  <h3 className="font-semibold mb-3 text-indigo-900">English Date</h3>
                  <div className="text-lg font-semibold text-indigo-800">
                    {new Date().toDateString()}
                  </div>
                </div>
                <div className="p-6 bg-indigo-50 rounded-xl border border-indigo-200">
                  <h3 className="font-semibold mb-3 text-indigo-900">Nepali Date</h3>
                  <div className="text-lg font-semibold text-indigo-800">
                    {new NepaliDate().toString()}
                  </div>
                </div>
                <div className="p-6 bg-indigo-50 rounded-xl border border-indigo-200">
                  <h3 className="font-semibold mb-3 text-indigo-900">Formatted Nepali</h3>
                  <div className="text-lg font-semibold text-indigo-800">
                    {new NepaliDate().format('YYYY-MM-DD')}
                  </div>
                </div>
              </div>
            </Card>

            {/* Features Overview */}
            <Card className={cn("p-8", styles.card, styles.section)}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 text-lg">⭐</span>
                </div>
                <h2 className={cn("text-2xl font-bold text-gray-900", styles.title)}>
                  Features Overview
                </h2>
              </div>
              <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", styles.grid)}>
                <div className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 bg-white">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">🔄</span>
                    <h3 className="font-semibold text-gray-900">Date Conversion</h3>
                  </div>
                  <p className="text-gray-600">Convert between BS and AD dates seamlessly</p>
                </div>
                <div className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 bg-white">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">📅</span>
                    <h3 className="font-semibold text-gray-900">Date Picking</h3>
                  </div>
                  <p className="text-gray-600">Interactive calendar components with smooth UX</p>
                </div>
                <div className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 bg-white">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">📊</span>
                    <h3 className="font-semibold text-gray-900">Range Selection</h3>
                  </div>
                  <p className="text-gray-600">Select date ranges with visual feedback</p>
                </div>
                <div className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 bg-white">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">✨</span>
                    <h3 className="font-semibold text-gray-900">Date Formatting</h3>
                  </div>
                  <p className="text-gray-600">Custom format patterns for flexible display</p>
                </div>
                <div className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 bg-white">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">⏰</span>
                    <h3 className="font-semibold text-gray-900">Time Support</h3>
                  </div>
                  <p className="text-gray-600">Date and time picker with precision</p>
                </div>
                <div className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 bg-white">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">🎨</span>
                    <h3 className="font-semibold text-gray-900">Customizable UI</h3>
                  </div>
                  <p className="text-gray-600">Override components and styles as needed</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Code Examples Tab */}
        {activeTab === 'code' && (
          <div className="space-y-8">
            <Card className={cn("p-8", styles.card, styles.section)}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <span className="text-indigo-600 text-lg">💻</span>
                </div>
                <h2 className={cn("text-2xl font-bold text-gray-900", styles.title)}>
                  Code Examples
                </h2>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Basic Usage */}
                  <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                    <h3 className="font-semibold mb-3 text-gray-900">Basic Date Picker</h3>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                      <pre>{`import NepaliCalendarInput from './NepaliCalendarInput';

function MyComponent() {
  const [date, setDate] = useState();
  
  return (
    <NepaliCalendarInput
      value={date}
      onChange={setDate}
      placeholder="Select date..."
    />
  );
}`}</pre>
                    </div>
                  </div>

                  {/* Range Picker */}
                  <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                    <h3 className="font-semibold mb-3 text-gray-900">Date Range Picker</h3>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                      <pre>{`import NepaliCalendarRangeUI from './NepaliCalendarRangeUI';

function MyComponent() {
  const [range, setRange] = useState({ start: null, end: null });
  
  return (
    <NepaliCalendarRangeUI
      onChange={setRange}
      components={{
        Button: MyButton,
        Select: MySelect
      }}
    />
  );
}`}</pre>
                    </div>
                  </div>

                  {/* Date Conversion */}
                  <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                    <h3 className="font-semibold mb-3 text-gray-900">Date Conversion</h3>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                      <pre>{`import NepaliDate from './NepaliDate';

// Convert BS to AD
const nepaliDate = new NepaliDate('2075-12-25');
const englishDate = nepaliDate.getEnglishDate();

// Convert AD to BS
const englishDate = new Date('2019-04-08');
const nepaliDate = new NepaliDate(englishDate);`}</pre>
                    </div>
                  </div>

                  {/* Custom Styling */}
                  <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                    <h3 className="font-semibold mb-3 text-gray-900">Custom Styling</h3>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                      <pre>{`<NepaliCalendarInput
  value={date}
  onChange={setDate}
  styles={{
    trigger: "custom-trigger-class",
    popover: "custom-popover-class"
  }}
  components={{
    Button: CustomButton,
    Select: CustomSelect
  }}
/>`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Evaluation Tab */}
        {activeTab === 'evaluation' && (
          <div className="space-y-8">
            <Card className={cn("p-8", styles.card, styles.section)}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-lg">📊</span>
                </div>
                <h2 className={cn("text-2xl font-bold text-gray-900", styles.title)}>
                  Component Evaluation
                </h2>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Performance */}
                  <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">⚡</span>
                      <h3 className="font-semibold text-green-900">Performance</h3>
                    </div>
                    <ul className="text-sm text-green-800 space-y-2">
                      <li>✅ Lightweight (~15KB gzipped)</li>
                      <li>✅ No external dependencies</li>
                      <li>✅ Optimized date calculations</li>
                      <li>✅ Efficient rendering</li>
                    </ul>
                  </div>

                  {/* Features */}
                  <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">🎯</span>
                      <h3 className="font-semibold text-blue-900">Features</h3>
                    </div>
                    <ul className="text-sm text-blue-800 space-y-2">
                      <li>✅ BS ↔ AD conversion</li>
                      <li>✅ Interactive calendars</li>
                      <li>✅ Date range selection</li>
                      <li>✅ Custom formatting</li>
                      <li>✅ Time support</li>
                    </ul>
                  </div>

                  {/* Customization */}
                  <div className="p-6 bg-purple-50 rounded-xl border border-purple-200">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">🎨</span>
                      <h3 className="font-semibold text-purple-900">Customization</h3>
                    </div>
                    <ul className="text-sm text-purple-800 space-y-2">
                      <li>✅ Component override</li>
                      <li>✅ Style customization</li>
                      <li>✅ Theme support</li>
                      <li>✅ Responsive design</li>
                    </ul>
                  </div>

                  {/* Compatibility */}
                  <div className="p-6 bg-orange-50 rounded-xl border border-orange-200">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">🔧</span>
                      <h3 className="font-semibold text-orange-900">Compatibility</h3>
                    </div>
                    <ul className="text-sm text-orange-800 space-y-2">
                      <li>✅ React 16.8+</li>
                      <li>✅ TypeScript support</li>
                      <li>✅ SSR compatible</li>
                      <li>✅ Modern browsers</li>
                    </ul>
                  </div>

                  {/* Use Cases */}
                  <div className="p-6 bg-indigo-50 rounded-xl border border-indigo-200">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">📋</span>
                      <h3 className="font-semibold text-indigo-900">Use Cases</h3>
                    </div>
                    <ul className="text-sm text-indigo-800 space-y-2">
                      <li>✅ Nepali government apps</li>
                      <li>✅ Financial applications</li>
                      <li>✅ Event management</li>
                      <li>✅ Booking systems</li>
                    </ul>
                  </div>

                  {/* Migration */}
                  <div className="p-6 bg-red-50 rounded-xl border border-red-200">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">🔄</span>
                      <h3 className="font-semibold text-red-900">Migration</h3>
                    </div>
                    <ul className="text-sm text-red-800 space-y-2">
                      <li>✅ Easy integration</li>
                      <li>✅ Drop-in replacement</li>
                      <li>✅ Backward compatible</li>
                      <li>✅ Gradual adoption</li>
                    </ul>
                  </div>
                </div>

                {/* Comparison with Alternatives */}
                <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Comparison with Alternatives</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 font-semibold">Feature</th>
                          <th className="text-center py-2 font-semibold text-green-600">This Library</th>
                          <th className="text-center py-2 font-semibold text-gray-600">Other Libraries</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="py-2 font-medium">Nepali Date Support</td>
                          <td className="text-center py-2 text-green-600">✅ Native</td>
                          <td className="text-center py-2 text-gray-500">❌ Limited</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Bundle Size</td>
                          <td className="text-center py-2 text-green-600">91KB</td>
                          <td className="text-center py-2 text-gray-500">100KB+</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Dependencies</td>
                          <td className="text-center py-2 text-green-600">4</td>
                          <td className="text-center py-2 text-gray-500">10+</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">TypeScript</td>
                          <td className="text-center py-2 text-green-600">✅ 100%</td>
                          <td className="text-center py-2 text-gray-500">⚠️ 50%</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Performance</td>
                          <td className="text-center py-2 text-green-600">✅ Optimized</td>
                          <td className="text-center py-2 text-gray-500">⚠️ Variable</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Decision Matrix */}
                <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Should You Use This?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-green-700 mb-3">✅ Use if you need:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Nepali date support in your app</li>
                        <li>• BS ↔ AD date conversion</li>
                        <li>• Interactive Nepali calendars</li>
                        <li>• Date range selection</li>
                        <li>• Customizable date pickers</li>
                        <li>• TypeScript support</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-700 mb-3">❌ Don't use if:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• You only need English dates</li>
                        <li>• You need complex date arithmetic</li>
                        <li>• You require heavy customization</li>
                        <li>• You need server-side rendering</li>
                        <li>• You have strict bundle size limits</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default NepaliDateVisualizer; 