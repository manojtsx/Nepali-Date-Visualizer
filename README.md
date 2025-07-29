# Nepali Date Components

A comprehensive collection of React components for handling Nepali dates (Bikram Sambat) with beautiful, interactive UI components. Perfect for applications that need to work with Nepali calendar dates.

## 🌟 Features

- **Date Conversion**: Convert between BS (Bikram Sambat) and AD (Anno Domini) dates
- **Interactive Calendars**: Beautiful, user-friendly date pickers
- **Date Range Selection**: Select date ranges with visual feedback
- **Date & Time Support**: Full datetime picker functionality
- **TypeScript Support**: Fully typed components
- **Customizable UI**: Override components and styles as needed
- **Less Dependencies**: Lightweight with no external dependencies
- **Modern Design**: Built with Tailwind CSS and shadcn/ui

## 📦 Installation

### Option 1: Clone and Copy (Recommended)

1. **Clone this repository:**
   ```bash
   git clone https://github.com/your-username/visualize-date.git
   cd visualize-date
   ```

2. **Copy the utils folder to your project:**
   ```bash
   cp -r src/utils /path/to/your/project/src/
   ```

3. **Install required dependencies in your project:**
   ```bash
   npm install lucide-react @radix-ui/react-popover @radix-ui/react-select
   # or
   yarn add lucide-react @radix-ui/react-popover @radix-ui/react-select
   ```

4. **Ensure you have shadcn/ui components installed:**
   ```bash
   npx shadcn-ui@latest add button select popover
   ```

### Option 2: Manual Setup

If you prefer to set up manually, ensure you have these dependencies:

```json
{
  "dependencies": {
    "lucide-react": "^0.263.1",
    "@radix-ui/react-popover": "^1.0.7",
    "@radix-ui/react-select": "^2.0.0"
  }
}
```

## 🚀 Quick Start

### Basic Date Picker

```tsx
import NepaliCalendarInput from './utils/NepaliCalendarInput';

function MyComponent() {
  const [date, setDate] = useState<Date>();

  return (
    <NepaliCalendarInput
      value={date}
      onChange={setDate}
      placeholder="Select a Nepali date..."
    />
  );
}
```

### Date Range Picker

```tsx
import NepaliCalendarRangeUI from './utils/NepaliCalendarRangeUI';

function MyComponent() {
  const [range, setRange] = useState({ start: null, end: null });

  return (
    <NepaliCalendarRangeUI
      onChange={setRange}
      placeholder="Select date range..."
    />
  );
}
```

### Date & Time Picker

```tsx
import NepaliCalendarInputDateTime from './utils/NepaliCalendarInputDateTime';

function MyComponent() {
  const [dateTime, setDateTime] = useState<Date>();

  return (
    <NepaliCalendarInputDateTime
      value={dateTime}
      onChange={setDateTime}
      placeholder="Select date and time..."
    />
  );
}
```

## 📋 Components Overview

### 1. NepaliCalendarInput
Single date picker with popover calendar.

**Props:**
- `value?: Date` - Selected date
- `onChange?: (date: Date) => void` - Date change handler
- `placeholder?: string` - Placeholder text
- `disabled?: boolean` - Disable the component
- `className?: string` - Additional CSS classes

### 2. NepaliCalendarInputDateTime
Date and time picker with time selection.

**Props:**
- `value?: Date` - Selected date and time
- `onChange?: (date: Date) => void` - Date/time change handler
- `placeholder?: string` - Placeholder text
- `disabled?: boolean` - Disable the component
- `className?: string` - Additional CSS classes

### 3. NepaliCalendarRangeUI
Date range picker with visual range selection.

**Props:**
- `onChange?: (range: { start: Date | null; end: Date | null }) => void` - Range change handler
- `placeholder?: string` - Placeholder text
- `disabled?: boolean` - Disable the component
- `className?: string` - Additional CSS classes
- `minYear?: number` - Minimum selectable year
- `maxYear?: number` - Maximum selectable year
- `labels?: object` - Custom labels for year, month, start, end
- `renderDay?: function` - Custom day renderer

### 4. NepaliCalendarUI
Interactive calendar display component.

**Props:**
- `className?: string` - Additional CSS classes

### 5. NepaliDate
Core date manipulation class.

```tsx
import NepaliDate from './utils/NepaliDate';

// Create from BS date
const nepaliDate = new NepaliDate('2075-12-25');

// Create from AD date
const nepaliDate = new NepaliDate(new Date('2019-04-08'));

// Convert to English date
const englishDate = nepaliDate.getEnglishDate();

// Format date
const formatted = nepaliDate.format('YYYY-MM-DD');
```

## 🔧 Utility Functions

### Date Formatting

```tsx
import { formatNepaliDate, formatNepaliDateTime } from './utils/formatNepaliDate';

// Format Nepali date
const formatted = formatNepaliDate(new Date(), (date) => date.toDateString());

// Format Nepali date and time
const formatted = formatNepaliDateTime(new Date(), (date) => date.toLocaleString());
```

## 🎨 Customization

### Custom Styling

All components use Tailwind CSS classes and can be customized:

```tsx
<NepaliCalendarInput
  className="custom-class"
  placeholder="Custom placeholder"
/>
```

### Custom Day Renderer

```tsx
<NepaliCalendarRangeUI
  renderDay={({ day, isToday, isInRange, isRangeStart, isRangeEnd, onClick, disabled }) => (
    <div
      onClick={onClick}
      className={`custom-day-class ${isToday ? 'today' : ''}`}
    >
      {day}
    </div>
  )}
/>
```

## 📊 Date Conversion Examples

| Bikram Sambat | Gregorian |
|----------------|-----------|
| 2075-12-25 | 2019-04-08 |
| 2080-01-01 | 2023-04-14 |
| 2070-06-15 | 2013-09-30 |

## 🏗️ Project Structure

```
src/utils/
├── NepaliCalendarInput.tsx          # Single date picker
├── NepaliCalendarInputDateTime.tsx  # Date & time picker
├── NepaliCalendarRangeUI.tsx        # Date range picker
├── NepaliCalendarUI.tsx             # Interactive calendar
├── NepaliDate.ts                    # Core date class
├── formatNepaliDate.ts              # Formatting utilities
├── config.ts                        # Configuration constants
└── NepaliDateVisualizer.tsx        # Demo component
```

## 🎯 Use Cases

- **Government Applications**: Official Nepali date requirements
- **Financial Applications**: Nepali fiscal year calculations
- **Event Management**: Nepali calendar events
- **Booking Systems**: Date range selections
- **Educational Apps**: Nepali calendar learning
- **Business Applications**: Nepali business date handling

## 🔍 Demo

Run the development server to see all components in action:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to explore the interactive demo with:
- Date pickers
- Date range selection
- Date conversion tools
- Formatting examples
- Component evaluation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide React](https://lucide.dev)
- Styling with [Tailwind CSS](https://tailwindcss.com)

---

**Note**: This library is specifically designed for Nepali date handling. For general date operations, consider using libraries like `date-fns` or `dayjs`.
