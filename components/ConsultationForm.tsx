
import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { Phone, MapPin, ExternalLink, Send, CheckCircle2 } from 'lucide-react';
import { CONSULTATION_URL, PHONE_NUMBER, handlePhoneClick } from '../constants';

// 스크롤 애니메이션 컴포넌트
interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const Reveal: React.FC<RevealProps> = ({ children, className = "", delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: '0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-200 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export const ConsultationForm: React.FC = () => {
  return (
    <section id="consultation" className="py-12 md:py-16 bg-yellow-400 text-zinc-900 scroll-mt-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text (기존 텍스트 영역) */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-yellow-400 font-bold text-xs rounded-full mb-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                1:1 맞춤 무료 교육 컨설팅
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-zinc-900 mb-4">
                망설이지 마세요.<br/>
                국비교육 전문가가 <br/>
                친절하게 안내해드립니다.
              </h2>
              <p className="text-base md:text-lg font-medium text-zinc-800 mb-6">
                국비지원 자격 여부부터 취업 및 교육과정까지<br className="hidden sm:inline" />
                <span className="border-b-2 border-black font-bold">무료로 상담해드립니다.</span>
              </p>
              
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="flex items-center gap-3 bg-black/5 px-4 py-3 rounded-xl border border-black/10">
                  <div className="w-9 h-9 bg-black text-yellow-400 rounded-full flex items-center justify-center shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-zinc-600">교육문의</p>
                    <a 
                      href={`tel:${PHONE_NUMBER.replace('-', '')}`} 
                      onClick={handlePhoneClick}
                      title="PC: 상담신청 페이지 열기 / 모바일: 전화 연결"
                      className="text-xl font-black block hover:text-red-700 transition-colors cursor-pointer"
                    >
                      {PHONE_NUMBER}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-black/5 px-4 py-3 rounded-xl border border-black/10">
                  <div className="w-9 h-9 bg-black text-yellow-400 rounded-full flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-zinc-600">교육방식</p>
                    <p className="text-xl font-black">100% 온라인</p>
                  </div>
                </div>
              </div>
              <p className="font-bold text-base mt-4 text-zinc-800">여러분의 꿈을 응원합니다!</p>
            </Reveal>
          </div>

          {/* Right Consultation CTA Button Card (새로 생성된 상담신청 버튼 - 기존 텍스트와 좌우로 나란히 배치) */}
          <div className="lg:col-span-5 w-full">
            <Reveal delay={150}>
              <div className="bg-white text-zinc-900 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border-2 border-zinc-900/10 flex flex-col justify-center items-center text-center space-y-6">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                  <Send className="w-8 h-8" />
                </div>
                
                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 bg-red-600 text-white font-black text-xs rounded-full">
                    간편 1분 접수
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
                    빠른 상담신청
                  </h3>
                  <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                    국비지원 여부 및 수강 절차가 궁금하신가요?<br />
                    지금 신청하시면 전문 멘토가 친절히 상담해드립니다.
                  </p>
                </div>

                {/* 상담신청 버튼 (클릭 시 새 창 열림) */}
                <a
                  href={CONSULTATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full inline-flex items-center justify-center gap-3 px-8 py-5 bg-red-600 hover:bg-red-700 text-white font-black text-lg sm:text-xl rounded-2xl shadow-xl hover:shadow-red-600/40 transition-all transform hover:-translate-y-1 active:translate-y-0 text-center cursor-pointer"
                  title="상담신청 (새 창 열림)"
                >
                  <span>상담신청 바로가기</span>
                  <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <div className="pt-3 border-t border-gray-100 w-full flex items-center justify-around text-xs font-bold text-zinc-500">
                  <span className="flex items-center gap-1">✓ 100% 무료 상담</span>
                  <span className="flex items-center gap-1">✓ 공식폼 간편신청</span>
                  <span className="flex items-center gap-1">✓ 빠른 피드백</span>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};

