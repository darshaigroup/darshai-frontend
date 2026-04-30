export const patients = [
  { id: '1', name: 'Aria Montgomery', age: 28, gender: 'Female', dosha: 'Vata-Pitta', lastVisit: '2024-03-10', status: 'Improving', avatar: 'https://i.pravatar.cc/150?u=aria', email: 'aria@example.com' },
  { id: '2', name: 'Julian Thorne', age: 45, gender: 'Male', dosha: 'Kapha', lastVisit: '2024-03-12', status: 'Stable', avatar: 'https://i.pravatar.cc/150?u=julian', email: 'julian@example.com' },
  { id: '3', name: 'Elena Gilbert', age: 32, gender: 'Female', dosha: 'Pitta', lastVisit: '2024-03-14', status: 'Stable', avatar: 'https://i.pravatar.cc/150?u=elena', email: 'elena@example.com' },
  { id: '4', name: 'Damon Salvatore', age: 38, gender: 'Male', dosha: 'Vata', lastVisit: '2024-03-15', status: 'Critical', avatar: 'https://i.pravatar.cc/150?u=damon', email: 'damon@example.com' },
  { id: '5', name: 'Bonnie Bennett', age: 26, gender: 'Female', dosha: 'Tridoshic', lastVisit: '2024-03-16', status: 'Improving', avatar: 'https://i.pravatar.cc/150?u=bonnie', email: 'bonnie@example.com' },
  { id: '6', name: 'Stefan Salvatore', age: 165, gender: 'Male', dosha: 'Vata', lastVisit: '2024-03-17', status: 'Stable', avatar: 'https://i.pravatar.cc/150?u=stefan', email: 'stefan@example.com' },
  { id: '7', name: 'Caroline Forbes', age: 24, gender: 'Female', dosha: 'Pitta-Kapha', lastVisit: '2024-03-18', status: 'Improving', avatar: 'https://i.pravatar.cc/150?u=caroline', email: 'caroline@example.com' },
  { id: '8', name: 'Tyler Lockwood', age: 27, gender: 'Male', dosha: 'Vata-Kapha', lastVisit: '2024-03-19', status: 'Stable', avatar: 'https://i.pravatar.cc/150?u=tyler', email: 'tyler@example.com' },
  { id: '9', name: 'Matt Donovan', age: 26, gender: 'Male', dosha: 'Vata', lastVisit: '2024-03-20', status: 'Stable', avatar: 'https://i.pravatar.cc/150?u=matt', email: 'matt@example.com' },
  { id: '10', name: 'Alaric Saltzman', age: 42, gender: 'Male', dosha: 'Pitta', lastVisit: '2024-03-21', status: 'Improving', avatar: 'https://i.pravatar.cc/150?u=alaric', email: 'alaric@example.com' },
];

export const healthMetrics = [
  { name: 'Mon', energy: 65, sleep: 70, stress: 40 },
  { name: 'Tue', energy: 70, sleep: 65, stress: 35 },
  { name: 'Wed', energy: 85, sleep: 80, stress: 20 },
  { name: 'Thu', energy: 75, sleep: 75, stress: 30 },
  { name: 'Fri', energy: 90, sleep: 85, stress: 15 },
  { name: 'Sat', energy: 95, sleep: 90, stress: 10 },
  { name: 'Sun', energy: 80, sleep: 95, stress: 5 },
];

export const alerts = [
  { id: '1', type: 'Critical', message: 'Patient Damon Salvatore: High Pitta aggravation detected.', time: '10 mins ago' },
  { id: '2', type: 'Reminder', message: 'Follow-up call with Aria Montgomery at 2:00 PM.', time: '1 hr ago' },
  { id: '3', type: 'System', message: 'AI Analysis: Weekly wellness report generated.', time: '3 hrs ago' },
];

export const messages = [
  { id: '1', from: 'Dr. Ananya', content: 'The new herbal formulation for Kapha balance is ready.', time: '09:30 AM' },
  { id: '2', from: 'Patient Julian', content: 'I feel much more energetic after the morning routine.', time: 'Yesterday' },
];
