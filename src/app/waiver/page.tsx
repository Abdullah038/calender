'use client';

import { useState, FormEvent, useRef, ChangeEvent } from 'react';
import SignatureCanvas from 'react-signature-canvas';

export default function Page() {
  const [fullName, setFullName] = useState<string>('');
  const [email, setemail] = useState<string>('');
  const [signature, setSignature] = useState<string>('');
  const sigCanvas = useRef<SignatureCanvas>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // TODO: send form data (fullName and signature DataURL) to your API
    alert('Waiver submitted!');
  };

  const handleClear = (): void => {
    sigCanvas.current?.clear();
    setSignature('');
  };

  const handleSaveSig = (): void => {
    const dataUrl = sigCanvas.current?.toDataURL();
    if (dataUrl) {
      setSignature(dataUrl);
    }
  };

  return (
    <div className="flex justify-center">
      <main className="w-[1396px] px-6 py-8">
        <h1 className="text-3xl font-bold mb-2 text-center">
          Bark and Beaches Collective
        </h1>
        <h2 className="text-xl text-gray-800 font-bold mb-8 text-center">
          Dog Service Waiver and Release Form
        </h2>

        <section className="mb-6">
          <p>
            I, the undersigned, hereby acknowledge and understand the following terms and
            conditions upon which I am engaging with Bark and Beaches Collective for dog
            services in Canada.
          </p>
        </section>

        {[
          { number: 1, title: 'ASSUMPTION OF RISKS', text: `I acknowledge that dog-related services, including pet transportation, walking, daycare, housesitting, drop in visits, and pet boarding, involve inherent risks, such as injuries, loss, sickness, or other harm. I willingly accept and assume such risks by choosing to use the services provided by Bark and Beaches Collective.` },
          { number: 2, title: 'VACCINATION AND HEALTH REQUIREMENTS', text: `I certify that my dog is in good health, free from contagious diseases or parasites, and has all necessary vaccinations as required by Canadian law, including rabies, distemper, and parvovirus vaccines. Should my dog require any additional vaccinations or health clearances, I agree to provide relevant documentation upon request.` },
          { number: 3, title: 'BEHAVIOR AND SAFETY', text: `I represent that my dog has no history of aggressive behavior towards people or other animals. I understand that it is my responsibility to inform Bark and Beaches Collective of any specific behavioral issues, allergies, or medical conditions my dog may have. If my dog exhibits aggressive or unsafe behaviour during service, I agree that Bark and Beaches Collective may refuse service, and I will be held responsible for any damages or injuries caused by my dog.` },
          { number: 4, title: 'EMERGENCY MEDICAL CARE', text: `In the event of an emergency, I consent to Bark and Beaches Collective seeking necessary veterinary care for my dog. I understand that I will be responsible for any medical costs incurred during treatment and will be promptly invoiced for reimbursement.` },
          { number: 5, title: 'PHOTOGRAPHY AND VIDEO RECORDINGS', text: `I acknowledge that Bark and Beaches Collective may take photographs or video recordings of my dog during services. I grant Bark and Beaches Collective permission to use such media for promotional purposes on their website or social media platforms without compensation.` },
          { number: 6, title: 'LIABILITY RELEASE', text: `I hereby release, waive and forever discharge Bark and Beaches Collective, its owners, employees, contractors, agents, and representatives from any and all liability or claims whatsoever arising out of any loss, injury, or damages to my dog or property related to the services provided by Bark and Beaches Collective.` },
          { number: 7, title: 'INDEMNIFICATION', text: `I agree to indemnify, defend, and hold harmless Bark and Beaches Collective and its owners, employees, contractors, agents, and representatives from all losses, liabilities, damages, injuries, claims and expenses, including legal fees, which arise directly or indirectly from my dog's participation in the dog-related services provided by Bark and Beaches Collective.` }
        ].map(({ number, title, text }) => (
          <section key={number} className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              {number}. {title}
            </h2>
            <p className="text-base text-gray-700 leading-relaxed">{text}</p>
          </section>
        ))}

        <section className="mt-8">
          <p className="mb-4">
            I have carefully read this Dog Service Waiver and Release Form, and I am freely and
            voluntarily signing it as my intent to accept its terms and conditions. This
            agreement shall be binding upon my heirs, executors, administrators and assigns.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                Print Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Print Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setemail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Your Signature
              </label>
              <SignatureCanvas
                ref={sigCanvas}
                penColor="black"
                canvasProps={{ className: 'border border-gray-300 rounded w-full h-40' }}
              />
              <div className="mt-2 flex space-x-4">
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-4 py-2"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={handleSaveSig}
                  className=" py-2 text-primaryColor underline font-bold"
                >
                  Save Signature
                </button>
              </div>
              {signature && (
                <img
                  src={signature}
                  alt="Saved signature"
                  className="mt-4 border border-gray-300"
                />
              )}
            </div>

            <button
              type="submit"
              className="px-6 py-2 bg-primaryColor text-white rounded hover:bg-primaryColor80"
            >
              Submit
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
