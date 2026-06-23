import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, MessageCircle, X, Send, Bot, RefreshCw } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { HYDERABAD_AREAS } from '../data/mockData';

export default function StyleRecommender() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Namaste! ✨ I am GlowBot, your personal AI beauty consultant. Tell me about your skin type, hair goals, or if you have an upcoming event (like a Hyderabad wedding or corporate meet) and I'll recommend the perfect service and salon!"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const { salons } = useBooking();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = inputText.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      let botResponse = "";
      let recommendations = [];

      const query = userMsg.toLowerCase();

      // Find matching area if mentioned in the query
      const matchedArea = HYDERABAD_AREAS.find(area => query.includes(area.toLowerCase()));

      // Score each salon based on query matches
      const scoredSalons = salons.map(salon => {
        let score = 0;

        // Area matching
        if (matchedArea && salon.area.toLowerCase() === matchedArea.toLowerCase()) {
          score += 15; // Strong match for explicit location
        } else if (query.includes(salon.area.toLowerCase())) {
          score += 8;
        }

        // Brand/Name matching
        if (query.includes(salon.name.toLowerCase())) {
          score += 12;
        } else {
          // Check parts of the name
          const nameParts = salon.name.toLowerCase().split(' ');
          nameParts.forEach(part => {
            if (part.length > 3 && query.includes(part)) {
              score += 4;
            }
          });
        }

        // Specialty/About matching
        if (query.includes('wedding') || query.includes('bridal') || query.includes('makeover')) {
          if (salon.about.toLowerCase().includes('bridal') || salon.about.toLowerCase().includes('makeup') || salon.about.toLowerCase().includes('wedding')) {
            score += 6;
          }
        }
        if (query.includes('massage') || query.includes('spa') || query.includes('reflexology') || query.includes('relax') || query.includes('wellness')) {
          if (salon.name.toLowerCase().includes('spa') || salon.name.toLowerCase().includes('wellness') || salon.about.toLowerCase().includes('massage') || salon.about.toLowerCase().includes('spa')) {
            score += 8;
          }
        }
        if (query.includes('hair') || query.includes('cut') || query.includes('balayage') || query.includes('shave') || query.includes('styling') || query.includes('botox')) {
          if (salon.about.toLowerCase().includes('hair') || salon.name.toLowerCase().includes('salon') || salon.name.toLowerCase().includes('hair') || salon.about.toLowerCase().includes('grooming')) {
            score += 3;
          }
        }
        if (query.includes('home') || query.includes('doorstep') || query.includes('at home')) {
          if (salon.name.toLowerCase().includes('home') || salon.about.toLowerCase().includes('doorstep') || salon.address.toLowerCase().includes('deliverable')) {
            score += 12;
          }
        }

        // Service matching
        salon.services.forEach(service => {
          if (query.includes(service.name.toLowerCase())) {
            score += 5;
          } else if (query.includes(service.category.toLowerCase())) {
            score += 2;
          }
        });

        // Price preference matching (budget / premium)
        if (query.includes('cheap') || query.includes('affordable') || query.includes('budget') || query.includes('low cost') || query.includes('less price')) {
          if (salon.priceTier === '₹') {
            score += 10;
          } else if (salon.priceTier === '₹₹') {
            score += 4;
          }
        } else if (query.includes('luxury') || query.includes('premium') || query.includes('expensive') || query.includes('high end')) {
          if (salon.priceTier === '₹₹₹') {
            score += 10;
          }
        }

        return { salon, score };
      });

      // Filter salons that have positive scores and sort them descending
      const validMatches = scoredSalons
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score);

      if (validMatches.length > 0) {
        const topMatch = validMatches[0].salon;
        const secondMatch = validMatches[1]?.salon;

        let responseText = "";
        
        // Contextual opening
        if (query.includes('wedding') || query.includes('bridal')) {
          responseText = "For your special day, I recommend the ultimate bridal treatments. ";
        } else if (query.includes('massage') || query.includes('spa')) {
          responseText = "To help you relax and rejuvenate, here is what I recommend. ";
        } else if (query.includes('hair') || query.includes('cut')) {
          responseText = "For precision hair styling and coloring, here are top picks. ";
        } else {
          responseText = "Based on your styling request, here are the best options. ";
        }

        responseText += `I highly recommend **${topMatch.name}** in ${topMatch.area} (rated ${topMatch.rating}★, ${topMatch.priceTier}). ${topMatch.about.substring(0, 110)}...`;

        if (secondMatch) {
          responseText += `\n\nAnother excellent choice is **${secondMatch.name}** in ${secondMatch.area} (rated ${secondMatch.rating}★, ${secondMatch.priceTier}), known for professional beauty care.`;
        }

        botResponse = responseText;
        recommendations = validMatches.slice(0, 2).map(item => ({
          name: item.salon.name,
          id: item.salon.id,
          action: `Book at ${item.salon.name.split(' ')[0]}`
        }));
      } else {
        // General fallback based on keywords
        if (query.includes('wedding') || query.includes('bridal') || query.includes('bride') || query.includes('makeup')) {
          botResponse = "For beautiful bridal makeup and event styling in Hyderabad, Aura Luxe Grooming (Jubilee Hills) is a premium option, or Gloss & Glow Home Services for booking a luxurious session directly at home.";
          recommendations = [
            { name: "Aura Luxe Grooming", id: 1, action: "Book Aura Luxe" },
            { name: "Gloss & Glow Home", id: 4, action: "Book Home Makeover" }
          ];
        } else if (query.includes('massage') || query.includes('relax') || query.includes('spa')) {
          botResponse = "I highly recommend Ziva Wellness & Spa (Gachibowli) for deep tissue massages, or O2 Spa (Hitech City) for a complete luxury couples spa package.";
          recommendations = [
            { name: "Ziva Wellness & Spa", id: 3, action: "Book Ziva" },
            { name: "O2 Spa", id: 10, action: "Book O2 Spa" }
          ];
        } else if (query.includes('hair') || query.includes('cut') || query.includes('style') || query.includes('color')) {
          botResponse = "For top-tier hair treatments, check out Toni & Guy (Jubilee Hills) for precision cuts, or Streax Professional Studio (Tolichowki) for creative, student-friendly hair colors.";
          recommendations = [
            { name: "Toni & Guy", id: 11, action: "Book Toni & Guy" },
            { name: "Streax Studio", id: 15, action: "Book Streax" }
          ];
        } else {
          botResponse = "I can guide you to the best salons in Hyderabad! Try asking about 'bridal makeup in Banjara Hills', 'hair color in Kondapur', or a 'relaxing massage in Gachibowli'. Or browse our collection directly.";
          recommendations = [
            { name: "Explore All Salons", id: "all", action: "Explore Salons" }
          ];
        }
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botResponse, recommendations }]);
      setIsTyping(false);
    }, 800);
  };

  const handleRecommendationClick = (rec) => {
    if (rec.id === "all") {
      navigate('/listing');
    } else {
      navigate(`/detail/${rec.id}`);
    }
    setIsOpen(false);
  };

  return (
    <div class="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          class="bg-primary hover:bg-primary-dark text-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-premium duration-300 transform hover:scale-105 flex items-center space-x-2 animate-bounce-soft hover:rotate-1 border border-rose-400 group"
          aria-label="Ask Style Advisor"
        >
          <Bot size={22} class="group-hover:rotate-12 transition-transform duration-300" />
          <span class="text-xs font-semibold tracking-wider pr-1 hidden sm:inline">Ask AI Guide</span>
          <span class="absolute -top-1 -right-1 flex h-3 w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-gold"></span>
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div class="bg-white w-[350px] sm:w-[380px] h-[500px] rounded-2xl shadow-2xl flex flex-col border border-rose-100 overflow-hidden animate-slide-in-right">
          
          {/* Header */}
          <div class="bg-gradient-to-r from-primary to-primary-dark p-4 text-white flex justify-between items-center shadow-md">
            <div class="flex items-center space-x-3">
              <div class="bg-white/20 p-2 rounded-full flex items-center justify-center">
                <Sparkles size={18} class="text-gold" />
              </div>
              <div>
                <h4 class="font-serif font-bold text-sm leading-tight tracking-wide">GlowBot Style AI</h4>
                <p class="text-[10px] text-pink-100 font-light font-sans">AI Beauty & Styling Guide</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              class="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-premium"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages List */}
          <div class="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                class={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div class="flex items-start space-x-2 max-w-[85%]">
                  {msg.sender === 'bot' && (
                    <div class="bg-primary/10 text-primary p-1.5 rounded-full flex items-center justify-center mt-1">
                      <Bot size={14} />
                    </div>
                  )}
                  <div
                    class={`p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-primary text-white rounded-tr-none'
                        : 'bg-white text-gray-700 rounded-tl-none border border-stone-100'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>

                {/* Recommendations buttons */}
                {msg.recommendations && msg.recommendations.length > 0 && (
                  <div class="mt-2.5 ml-8 flex flex-wrap gap-2 animate-fade-in-up">
                    {msg.recommendations.map((rec, rIdx) => (
                      <button
                        key={rIdx}
                        onClick={() => handleRecommendationClick(rec)}
                        class="bg-rose-50 hover:bg-primary hover:text-white text-primary text-[10px] font-bold py-1.5 px-3 rounded-lg border border-primary/20 transition-premium shadow-sm flex items-center space-x-1"
                      >
                        <span>{rec.action}</span>
                        <Sparkles size={8} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div class="flex items-start space-x-2">
                <div class="bg-primary/10 text-primary p-1.5 rounded-full flex items-center justify-center mt-1">
                  <Bot size={14} />
                </div>
                <div class="bg-white border border-stone-100 p-3 rounded-2xl rounded-tl-none flex space-x-1 items-center">
                  <div class="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce"></div>
                  <div class="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div class="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions row */}
          <div class="bg-white px-4 py-2 border-t border-stone-100 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
            <button
              onClick={() => setInputText("Recommend bridal makeup")}
              class="bg-stone-100 hover:bg-rose-50 text-gray-600 hover:text-primary text-[9px] py-1 px-2.5 rounded-full border border-stone-200 hover:border-primary/20 transition-premium font-medium"
            >
              👰 Wedding Look
            </button>
            <button
              onClick={() => setInputText("Best salon for hair color")}
              class="bg-stone-100 hover:bg-rose-50 text-gray-600 hover:text-primary text-[9px] py-1 px-2.5 rounded-full border border-stone-200 hover:border-primary/20 transition-premium font-medium"
            >
              💇 Hair Balayage
            </button>
            <button
              onClick={() => setInputText("Relaxing spa in Gachibowli")}
              class="bg-stone-100 hover:bg-rose-50 text-gray-600 hover:text-primary text-[9px] py-1 px-2.5 rounded-full border border-stone-200 hover:border-primary/20 transition-premium font-medium"
            >
              🧖 Massage
            </button>
          </div>

          {/* Form Input */}
          <form onSubmit={handleSendMessage} class="p-3 bg-white border-t border-stone-100 flex items-center space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask for hair cuts, wedding, skin types..."
              class="flex-1 bg-stone-50 border border-stone-200 focus:border-primary focus:outline-none rounded-xl py-2 px-3.5 text-xs transition-premium"
            />
            <button
              type="submit"
              class="bg-primary hover:bg-primary-dark text-white rounded-xl p-2 transition-premium flex items-center justify-center"
              aria-label="Send Message"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
