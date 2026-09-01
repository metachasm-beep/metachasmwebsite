import React, { useRef, useState } from 'react';
import ShinyText from './react-bits/ShinyText/ShinyText';
import GhostCursor from './react-bits/GhostCursor/GhostCursor';
import { FieldGroup, Field, FieldLabel } from './ui/field';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { BorderBeam } from './ui/border-beam';

export default function Contact() {
  const containerRef = useRef(null);

  const [formState, setFormState] = useState('idle'); // 'idle', 'submitting', 'success', 'error', 'validation_error'
  const [formData, setFormData] = useState({ name: '', email: '', details: '' });
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.details) {
      setFormState('validation_error');
      setErrorMsg('PLEASE FILL OUT ALL FIELDS.');
      setTimeout(() => {
        setFormState('idle');
        setErrorMsg('');
      }, 3000);
      return;
    }
    
    setFormState('submitting');
    
    try {
      const jsonData = JSON.stringify({
        name: formData.name,
        email: formData.email,
        details: formData.details
      });

      await fetch('https://script.google.com/macros/s/AKfycbwvv3mIdaDrsYzdrOfX_fNqG35CN60drWfTgw0r6TRgdb5Tf1iT3gKhefq4hmcLMWhs/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: jsonData
      });
      
      setFormState('success');
      setFormData({ name: '', email: '', details: '' });
      setTimeout(() => setFormState('idle'), 4000);
    } catch (error) {
      console.error('Submission error:', error);
      setFormState('error');
      setErrorMsg('SYSTEM ERROR. PLEASE TRY AGAIN.');
      setTimeout(() => {
        setFormState('idle');
        setErrorMsg('');
      }, 4000);
    }
  };

  return (
    <section ref={containerRef} className="fold min-h-screen w-full flex items-center justify-center bg-transparent text-[#111111] py-12 md:py-32 relative overflow-hidden" id="contact">
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <GhostCursor 
          color="#0055FF" 
          opacity={0.15} 
          blur={8} 
          length={25} 
          containerRef={containerRef} 
        />
      </div>

      <div className="container mx-auto px-6 max-w-4xl flex flex-col items-center relative z-10 pointer-events-auto">
        
        <div className="reveal-up w-full text-center mb-10 md:mb-16">
          <p className="text-[10px] font-medium tracking-[0.3em] text-[#111111]/50 uppercase mb-8" style={{ fontFamily: 'var(--font-mono)' }}>
            [06] Contact Us
          </p>
          <h2 className="text-[clamp(2.5rem,8vw,6rem)] tracking-tight text-[#111111] uppercase" style={{ fontFamily: 'var(--font-heading)' }}>
            Let's Talk<span className="text-[#0055FF]">.</span>
          </h2>
          <div className="mt-8 border-t border-[#111111]/20 pt-8 w-full max-w-md mx-auto">
            <a href="mailto:hello@metachasm.com" className="text-sm tracking-widest uppercase hover:text-[#0055FF] transition-colors duration-500 font-bold" style={{ fontFamily: 'var(--font-mono)' }}>
              hello@metachasm.com
            </a>
          </div>
        </div>

        <div className="reveal-up w-full max-w-2xl bg-[#F9F9F6]/60 backdrop-blur-md border border-[#111111]/10 p-6 md:p-12 relative overflow-hidden" data-delay="200">
          <BorderBeam size={250} duration={12} delay={9} colorFrom="#0055FF" colorTo="#111111" />
          <form className="w-full flex flex-col items-center relative z-10" onSubmit={handleSubmit}>
            <FieldGroup className="w-full gap-8 mb-12">
              
              <Field>
                <FieldLabel className="sr-only">Full Name</FieldLabel>
                <Input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={formState === 'submitting'}
                  className="bg-transparent border-0 border-b border-[#111111]/20 text-lg md:text-2xl py-4 px-0 text-center text-[#111111] placeholder:text-[#111111]/30 focus-visible:ring-0 focus-visible:border-[#0055FF] rounded-none h-auto transition-colors duration-500 disabled:opacity-50"
                  style={{ fontFamily: 'var(--font-mono)' }}
                  placeholder="FULL NAME"
                />
              </Field>

              <Field>
                <FieldLabel className="sr-only">Email Address</FieldLabel>
                <Input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={formState === 'submitting'}
                  className="bg-transparent border-0 border-b border-[#111111]/20 text-lg md:text-2xl py-4 px-0 text-center text-[#111111] placeholder:text-[#111111]/30 focus-visible:ring-0 focus-visible:border-[#0055FF] rounded-none h-auto transition-colors duration-500 disabled:opacity-50"
                  style={{ fontFamily: 'var(--font-mono)' }}
                  placeholder="EMAIL ADDRESS"
                />
              </Field>

              <Field>
                <FieldLabel className="sr-only">Project Details</FieldLabel>
                <Textarea 
                  rows={3}
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  disabled={formState === 'submitting'}
                  className="bg-transparent border-0 border-b border-[#111111]/20 text-lg md:text-2xl py-4 px-0 text-center text-[#111111] placeholder:text-[#111111]/30 focus-visible:ring-0 focus-visible:border-[#0055FF] rounded-none h-auto resize-none transition-colors duration-500 disabled:opacity-50"
                  style={{ fontFamily: 'var(--font-mono)' }}
                  placeholder="PROJECT DETAILS"
                />
              </Field>

            </FieldGroup>

            <Button 
              type="submit" 
              variant="outline"
              disabled={formState === 'submitting' || formState === 'success'}
              className={`bg-[#111111] border border-[#111111] text-[#F9F9F6] font-bold uppercase tracking-[0.3em] text-[10px] py-6 px-8 md:py-8 md:px-16 transition-all duration-500 rounded-none w-full md:w-auto disabled:opacity-100 ${
                formState === 'success' ? '!bg-[#0055FF] !border-[#0055FF]' : 
                formState === 'error' || formState === 'validation_error' ? '!bg-red-600 !border-red-600' :
                'hover:bg-[#0055FF] hover:border-[#0055FF] hover:text-[#F9F9F6]'
              }`}
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <ShinyText 
                text={
                  formState === 'submitting' ? 'TRANSMITTING...' :
                  formState === 'success' ? 'MESSAGE RECEIVED' :
                  (formState === 'error' || formState === 'validation_error') ? errorMsg :
                  'SEND MESSAGE'
                } 
                disabled={formState === 'success' || formState === 'error' || formState === 'validation_error'} 
                speed={3} 
                className="text-current transition-colors duration-700 pointer-events-none" 
              />
            </Button>

          </form>
        </div>
        
      </div>

      {/* Footer moved from App.jsx */}
      <footer className="absolute bottom-0 left-0 w-full py-8 text-center text-[#111111]/60 border-t border-[#111111]/10 flex flex-col md:flex-row items-center justify-center gap-4 z-50 bg-[#FAFAFA]">
        <p>&copy; {new Date().getFullYear()} Metachasm. Engineered for the future.</p>
        <div className="flex items-center gap-4 text-xs">
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('openLegalModal', { detail: 'privacy' }))}
            className="hover:text-[#0055FF] transition-colors"
          >
            Privacy Policy
          </button>
          <span>|</span>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('openLegalModal', { detail: 'terms' }))}
            className="hover:text-[#0055FF] transition-colors"
          >
            Terms & Conditions
          </button>
        </div>
      </footer>
    </section>
  );
}


