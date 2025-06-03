import React from 'react';

const sections = [
  {
    title: 'Vaccinations',
    content: [
      'Dogs must be up-to-date on their vaccinations and we may ask for a copy of their records for confirmation.'
    ]
  },
  {
    title: 'Food and Feeding',
    content: [
      'We are always happy to fill your dog’s belly!',
      'Dogs that need to be fed during their stay are always fed separately. It is up to the dog owners to provide an outline of their dog’s eating schedule so we can mimic their daily routine.',
      'It’s also the owner’s responsibility to outline any allergies your furry pet may have.'
    ]
  },
  {
    title: 'Behaviour and Excessive Barking',
    content: [
      'We understand that a dog’s behaviour can change when they are in a new environment—this is common. However, for the safety of other dogs and our staff, any dog who exhibits aggressive behaviour will be refused service.',
      'Dogs who bark excessively during daycare can also be refused service since it interrupts the peace of the pack.'
    ]
  },
  {
    title: 'Collar, Harness & Leash',
    content: [
      'The safety of your pet is important to us. We require all dogs at drop-off to have a proper collar, leash and/or harness. It is the owner’s responsibility to ensure their dog’s equipment is properly secured and safe to use.'
    ]
  },
  {
    title: 'Punctuality',
    content: [
      'Animal care necessitates a great deal of planning, setup, cleaning, and scheduling. Clients must respect our operating parameters so our business can run smoothly.',
      'We don’t penalize clients for occasional lateness, but if someone is routinely late for drop-off or pick-up we reserve the right to refuse future service.'
    ]
  },
  {
    title: 'Drop-off & Pick-up',
    content: [
      'Boarding: Text us when you’re 10 minutes away for both drop-off and pick-up.',
      'Daycare: Drop-off any time after 6:00 am. Pick-up by 7:00 pm unless arranged otherwise—please text when you’re 10 minutes away. Early pick-up requests are welcome with advance notice.'
    ]
  },
  {
    title: 'Cancellation',
    content: [
      'Daycare: Covers an 8-hour period. Cancellations must be made at least 72 hours in advance. Late cancellations require full payment. Frequent cancellers may be moved to a daily waitlist and future service can be refused.',
      'Boarding: Covers a 24-hour period. Full payment due two weeks before your stay. Last-minute bookings allowed if space permits. Shortened stays are non-refundable; extensions depend on availability and require upfront payment. All payments are non-refundable.',
      'House Sitting: Full payment due two weeks before your scheduled dates. Last-minute bookings allowed if space permits. Extensions require upfront payment. All payments are non-refundable.'
    ]
  },
  {
    title: 'Drop-in Visits & Walks',
    content: [
      'Cancellations must be made at least 24 hours in advance.',
      'Rates may change without notice and are subject to applicable taxes.',
      'Booking times are approximate to allow flexibility for our walkers.'
    ]
  }
];

export default function PrivacyPolicy() {
  return (
    <div className='flex items-center justify-center'>
    <main className="w-[1396px] px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Policies</h1>
      {sections.map(({ title, content }) => (
        <section key={title} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{title}</h2>
          {content.map((text, idx) => (
            <p key={idx} className="text-base text-gray-700 mb-2">
              {text}
            </p>
          ))}
        </section>
      ))}
 
   </main>
   </div>
  );
}