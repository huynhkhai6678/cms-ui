export function generateTimeSlots(startTime: string, endTime: string, gap: number): TimeSlot[] {
  const formatTime = (time: Date): string => {
    let hours = time.getHours();
    const minutes = time.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';

    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12;

    const minutesString = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutesString} ${period}`;
  };

  // Function to convert time string (e.g., "00:00", "24:00") into Date object
  const convertTimeToDate = (timeString: string): Date => {
    let [hours, minutes] = timeString.split(':').map(num => parseInt(num, 10));
    if (hours === 24) { // Handle special case for '24:00'
      hours = 23;
      minutes = 59;
    }
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  // Convert start and end times to Date objects
  const startDate = convertTimeToDate(startTime);
  const endDate = convertTimeToDate(endTime);

  const currentTime = startDate;
  const slots: TimeSlot[] = [];

  // Generate time slots
  while (currentTime < endDate) {
    const label = formatTime(currentTime);   // Set label from current time
    const value = label;  // Set value to the same as label

    slots.push({ label, value });

    // Increment time by the gap
    currentTime.setMinutes(currentTime.getMinutes() + gap);
  }

  return slots;
}

export interface TimeSlot {
  label: string;
  value: string;
}