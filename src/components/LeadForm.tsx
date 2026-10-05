import React, { useState } from 'react';
import { Send, CheckCircle2, Phone, Mail, Building, User, ChevronRight, HelpCircle } from 'lucide-react';
import { LeadSubmission } from '../types';

interface LeadFormProps {
  initialSector?: string;
  onSuccess?: () => void;
}

export default function LeadForm({ initialSector = '', onSuccess }: LeadFormProps) {
  const [formData, setFormData] = useState<LeadSubmission>({
    name: '',
    email: '',
    phone: '',
    company: '',
    sector: initialSector,
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('الرجاء كتابة الاسم ورقم الهاتف للتواصل معك');
      return;
    }

    setIsSubmitting(true);

    // Deliver the lead to the team via WhatsApp (same funnel as the diagnostic tool)
    handleWhatsAppRedirect();

    // Persist locally as a backup record
    setTimeout(() => {
      const existingLeads = JSON.parse(localStorage.getItem('shavi_leads') || '[]');
      existingLeads.push({
        ...formData,
        id: Date.now(),
        submittedAt: new Date().toISOString()
      });
      localStorage.setItem('shavi_leads', JSON.stringify(existingLeads));

      setIsSubmitting(false);
      setSubmitSuccess(true);
      if (onSuccess) {
        setTimeout(onSuccess, 1500);
      }
    }, 1200);
  };

  // Direct WhatsApp link generation with predefined custom message
  const handleWhatsAppRedirect = () => {
    const defaultText = `مرحباً Shavi Agency، أنا مهتم بالانضمام إلى برنامج Growth Hacking وتطبيق نظام التشغيل في شركتي.
الاسم: ${formData.name || 'غير محدد'}
الهاتف: ${formData.phone || 'غير محدد'}
الشركة: ${formData.company || 'غير محدد'}
القطاع: ${formData.sector || 'غير محدد'}
الرسالة: ${formData.message || 'أرغب في حجز جلسة استشارية مجانية للتعرف على عروض الـ 6 أشهر.'}`;

    const encodedText = encodeURIComponent(defaultText);
    window.open(`https://wa.me/201115042478?text=${encodedText}`, '_blank');
  };

  return (
    <div className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-3xl p-6 md:p-8 shadow-xl shadow-gray-100/50">
      {submitSuccess ? (
        <div className="text-center py-12 animate-fade-in">
          <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">تم تسجيل طلبك بنجاح</h3>
          <p className="text-gray-500 max-w-sm mx-auto mb-8">
            لقد تم حجز موعدك الأولي. سيقوم أحد مستشاري النمو في Shavi بالتواصل معك خلال 4 ساعات لترتيب اللقاء الاستراتيجي.
          </p>
          <button
            onClick={handleWhatsAppRedirect}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-full shadow-lg shadow-green-500/20 transition-all cursor-pointer"
          >
            <span>أو تواصل معنا فوراً على الواتساب</span>
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="text-center md:text-right mb-6">
            <h3 className="text-xl font-bold text-gray-900">حجز جلسة استكشاف وتشخيص مجانية</h3>
            <p className="text-sm text-gray-500 mt-1">
              املأ البيانات التالية لتمكين فريقنا من تحضير تقرير تشخيص أولي عن شركتك قبل اللقاء.
            </p>
          </div>

          {/* Name Field */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5 mr-1">الاسم الكامل <span className="text-accent-red">*</span></label>
            <div className="relative">
              <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 pointer-events-none">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="أحمد علي"
                className="w-full pr-10 pl-4 py-3 text-sm rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-accent-red/5 focus:border-accent-red transition-all"
              />
            </div>
          </div>

          {/* Contact Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Phone Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 mr-1">رقم الهاتف (واتساب مفضل) <span className="text-accent-red">*</span></label>
              <div className="relative">
                <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 pointer-events-none">
                  <Phone className="w-4 h-4" />
                </span>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+20 111 111 1111"
                  className="w-full pr-10 pl-4 py-3 text-sm rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-accent-red/5 focus:border-accent-red transition-all font-en text-right"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 mr-1">البريد الإلكتروني المهني</label>
              <div className="relative">
                <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 pointer-events-none">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="w-full pr-10 pl-4 py-3 text-sm rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-accent-red/5 focus:border-accent-red transition-all font-en text-right"
                  dir="ltr"
                />
              </div>
            </div>
          </div>

          {/* Company & Sector Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Company Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 mr-1">اسم الشركة أو المشروع</label>
              <div className="relative">
                <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 pointer-events-none">
                  <Building className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="شركتك الموقرة"
                  className="w-full pr-10 pl-4 py-3 text-sm rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-accent-red/5 focus:border-accent-red transition-all"
                />
              </div>
            </div>

            {/* Sector Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 mr-1">قطاع العمل الرئيسي</label>
              <div className="relative">
                <select
                  name="sector"
                  value={formData.sector}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-accent-red/5 focus:border-accent-red transition-all appearance-none cursor-pointer text-gray-800"
                >
                  <option value="">اختر القطاع المناسب...</option>
                  <option value="saas">البرمجيات وتطبيقات SaaS</option>
                  <option value="medical">القطاع الطبي والعيادات</option>
                  <option value="real_estate">القطاع العقاري والمطوريين</option>
                  <option value="e_commerce">المتاجر الإلكترونية والـ Retail</option>
                  <option value="education">المؤسسات التعليمية والأكاديميات</option>
                  <option value="corporate">الشركات الاستشارية والخدمات</option>
                  <option value="other">قطاع آخر / خدمات مخصصة</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                  <ChevronRight className="w-4 h-4 rotate-95" />
                </div>
              </div>
            </div>
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5 mr-1">ما هي أكبر عقبة تواجه نمو شركتك حالياً؟</label>
            <textarea
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="مثال: ضعف جودة العملاء، بطء إغلاق المبيعات، عشوائية الإعلانات، أو الرغبة في أتمتة الردود والمتابعة."
              className="w-full p-4 text-sm rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-accent-red/5 focus:border-accent-red transition-all resize-none"
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3.5 bg-gray-900 hover:bg-black disabled:bg-gray-400 text-white font-bold rounded-full text-sm shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isSubmitting ? 'جاري إرسال طلبك...' : 'حجز الجلسة المجانية وإرسال'}</span>
              <Send className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleWhatsAppRedirect}
              className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-full text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>واتساب سريع</span>
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.388 1.966 13.92 1.01 11.986 1.01 6.55 1.01 2.126 5.378 2.122 10.806c-.001 1.694.446 3.348 1.298 4.793l-.993 3.624 3.72-.969zm13.125-10.222c-.3-.149-1.772-.865-2.046-.963-.274-.099-.473-.149-.673.149-.199.299-.772.963-.947 1.161-.174.199-.349.224-.649.075-.3-.149-1.264-.462-2.408-1.474-.89-.785-1.49-1.755-1.665-2.053-.174-.299-.018-.46.131-.609.135-.133.3-.349.449-.523.149-.174.199-.299.299-.497.099-.198.05-.373-.025-.522-.075-.149-.672-1.62-.922-2.213-.242-.581-.489-.502-.673-.512-.174-.009-.373-.01-.572-.01-.199 0-.523.075-.797.373-.274.299-1.047 1.02-1.047 2.487 0 1.468 1.07 2.885 1.218 3.085.149.199 2.107 3.187 5.1 4.467.712.305 1.269.487 1.703.625.713.227 1.36.195 1.872.118.571-.085 1.772-.717 2.022-1.411.249-.695.249-1.29.174-1.411-.074-.122-.273-.197-.573-.346z" />
              </svg>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
