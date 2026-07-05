import React, { useRef } from 'react';
import ShinyText from './react-bits/ShinyText/ShinyText';
import GhostCursor from './react-bits/GhostCursor/GhostCursor';
import { FieldGroup, Field, FieldLabel } from './ui/field';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { BorderBeam } from './ui/border-beam';

export default function Contact() {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="fold min-h-screen w-full flex items-center justify-center bg-transparent text-[#111111] py-32 relative overflow-hidden" id="contact">
      
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
        
        <div className="reveal-up w-full text-center mb-16">
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

        <div className="reveal-up w-full max-w-2xl bg-[#F9F9F6]/60 backdrop-blur-md border border-[#111111]/10 p-8 md:p-12 relative overflow-hidden" data-delay="200">
          <BorderBeam size={250} duration={12} delay={9} colorFrom="#0055FF" colorTo="#111111" />
          <form className="w-full flex flex-col items-center relative z-10" onSubmit={(e) => e.preventDefault()}>
            <FieldGroup className="w-full gap-8 mb-12">
              
              <Field>
                <FieldLabel className="sr-only">Full Name</FieldLabel>
                <Input 
                  type="text" 
                  required 
                  className="bg-transparent border-0 border-b border-[#111111]/20 text-xl md:text-2xl py-4 px-0 text-center text-[#111111] placeholder:text-[#111111]/30 focus-visible:ring-0 focus-visible:border-[#0055FF] rounded-none h-auto transition-colors duration-500"
                  style={{ fontFamily: 'var(--font-mono)' }}
                  placeholder="FULL NAME"
                />
              </Field>

              <Field>
                <FieldLabel className="sr-only">Email Address</FieldLabel>
                <Input 
                  type="email" 
                  required 
                  className="bg-transparent border-0 border-b border-[#111111]/20 text-xl md:text-2xl py-4 px-0 text-center text-[#111111] placeholder:text-[#111111]/30 focus-visible:ring-0 focus-visible:border-[#0055FF] rounded-none h-auto transition-colors duration-500"
                  style={{ fontFamily: 'var(--font-mono)' }}
                  placeholder="EMAIL ADDRESS"
                />
              </Field>

              <Field>
                <FieldLabel className="sr-only">Project Details</FieldLabel>
                <Textarea 
                  rows={3}
                  required 
                  className="bg-transparent border-0 border-b border-[#111111]/20 text-xl md:text-2xl py-4 px-0 text-center text-[#111111] placeholder:text-[#111111]/30 focus-visible:ring-0 focus-visible:border-[#0055FF] rounded-none h-auto resize-none transition-colors duration-500"
                  style={{ fontFamily: 'var(--font-mono)' }}
                  placeholder="PROJECT DETAILS"
                />
              </Field>

            </FieldGroup>

            <Button 
              type="submit" 
              variant="outline"
              className="bg-[#111111] border border-[#111111] text-[#F9F9F6] font-bold uppercase tracking-[0.3em] text-[10px] py-8 px-16 hover:bg-[#0055FF] hover:border-[#0055FF] hover:text-[#F9F9F6] transition-all duration-500 rounded-none w-full md:w-auto"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <ShinyText text="SEND MESSAGE" disabled={false} speed={3} className="text-current transition-colors duration-700" />
            </Button>

          </form>
        </div>
        
      </div>
    </section>
  );
}


