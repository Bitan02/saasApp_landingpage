"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  Play,
  Check,
  Star,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Zap,
  Shield,
  Users,
  BarChart3,
  Globe,
  Smartphone,
  X,
  Mail,
  Calendar,
  ArrowRight,
} from "lucide-react"
import Image from "next/image"

// Reusable Button Component
interface ButtonProps {
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
  icon?: React.ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
  type?: "button" | "submit" | "reset"
}
const Button = ({
  variant = "primary",
  size = "md",
  children,
  icon,
  onClick,
  className = "",
  disabled = false,
  type = "button",
}: ButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500 shadow-lg hover:shadow-xl",
    secondary: "bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 focus:ring-white/50",
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-6 py-3 text-base gap-2",
    lg: "px-8 py-4 text-lg gap-3",
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {icon}
      {children}
    </button>
  )
}


// Reusable Card Component
interface CardProps {
  title?: string
  subtitle?: string
  children: React.ReactNode
  image?: string
  icon?: React.ReactNode
  className?: string
  hover?: boolean
}

const Card = ({ title, subtitle, children, image, icon, className = "", hover = true }: CardProps) => {
  return (
    <motion.div
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      className={`bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6 ${hover ? "hover:shadow-2xl hover:bg-white/15" : ""} transition-all duration-300 ${className}`}
    >
      {image && (
        <div className="mb-4">
          <Image src={image || "/placeholder.svg"} alt={title || ""} width={400} height={200} className="rounded-lg" />
        </div>
      )}
      {icon && <div className="mb-4 text-blue-400">{icon}</div>}
      {title && <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>}
      {subtitle && <p className="text-gray-300 mb-4">{subtitle}</p>}
      {children}
    </motion.div>
  )
}

// Modal Component
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">{title}</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Input Component
interface InputProps {
  label: string
  type?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  error?: string
  required?: boolean
}

const Input = ({ label, type = "text", placeholder, value, onChange, error, required }: InputProps) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-white">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      />
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  )
}

// Textarea Component
interface TextareaProps {
  label: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  error?: string
  required?: boolean
  rows?: number
}

const Textarea = ({ label, placeholder, value, onChange, error, required, rows = 4 }: TextareaProps) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-white">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
      />
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  )
}

// Pricing Card Component
interface PricingCardProps {
  planName: string
  price: string
  features: string[]
  highlighted?: boolean
  disabled?: boolean
  onSelect: () => void
}

const PricingCard = ({
  planName,
  price,
  features,
  highlighted = false,
  disabled = false,
  onSelect,
}: PricingCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className={`relative bg-white/10 backdrop-blur-lg rounded-xl border p-8 transition-all duration-300 ${
        highlighted ? "border-blue-400 bg-white/15 shadow-2xl" : "border-white/20 hover:border-white/30"
      } ${disabled ? "opacity-50" : ""}`}
    >
      {highlighted && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">{planName}</h3>
        <div className="mb-6">
          <span className="text-4xl font-bold text-white">{price}</span>
          <span className="text-gray-300">/month</span>
        </div>

        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-300">
              <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        <Button
          variant={highlighted ? "primary" : "secondary"}
          size="lg"
          onClick={onSelect}
          disabled={disabled}
          className="w-full"
        >
          Get Started
        </Button>
      </div>
    </motion.div>
  )
}

// Testimonial Card Component
interface TestimonialCardProps {
  photo: string
  name: string
  role: string
  content: string
}

const TestimonialCard = ({ photo, name, role, content }: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-300"
    >
      <div className="flex items-center mb-6">
        <Image src={photo || "/placeholder.svg"} alt={name} width={60} height={60} className="rounded-full mr-4" />
        <div>
          <h4 className="text-white font-semibold">{name}</h4>
          <p className="text-gray-300 text-sm">{role}</p>
        </div>
        <div className="ml-auto flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current" />
          ))}
        </div>
      </div>
      <p className="text-gray-300 leading-relaxed">{content}</p>
    </motion.div>
  )
}

// Accordion Component
interface AccordionItem {
  title: string
  content: string
}

interface AccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
}

const Accordion = ({ items, allowMultiple = false }: AccordionProps) => {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    if (allowMultiple) {
      setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
    } else {
      setOpenItems((prev) => (prev.includes(index) ? [] : [index]))
    }
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
          >
            <span className="text-white font-medium">{item.title}</span>
            <ChevronDown
              className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                openItems.includes(index) ? "rotate-180" : ""
              }`}
            />
          </button>
          <AnimatePresence>
            {openItems.includes(index) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-4 text-gray-300">{item.content}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

export default function SaaSLandingPage() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  // State for various components
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [users, setUsers] = useState(10)
  const [billingType, setBillingType] = useState<"monthly" | "yearly">("monthly")

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Sample data
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Built for speed with optimized performance and instant loading times.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description: "Bank-level security with end-to-end encryption and compliance.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Collaboration",
      description: "Work together seamlessly with real-time collaboration tools.",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Advanced Analytics",
      description: "Get insights with powerful analytics and reporting features.",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Scale",
      description: "Deploy worldwide with our global infrastructure and CDN.",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile First",
      description: "Responsive design that works perfectly on all devices.",
    },
  ]

  const testimonials = [
    {
      photo: "/placeholder.svg?height=60&width=60",
      name: "Sarah Johnson",
      role: "CEO at TechCorp",
      content:
        "This platform has transformed how we work. The intuitive interface and powerful features have increased our productivity by 300%.",
    },
    {
      photo: "/placeholder.svg?height=60&width=60",
      name: "Michael Chen",
      role: "CTO at StartupXYZ",
      content:
        "The best investment we've made for our team. The collaboration features are game-changing and the support is outstanding.",
    },
    {
      photo: "/placeholder.svg?height=60&width=60",
      name: "Emily Rodriguez",
      role: "Product Manager at InnovateCo",
      content:
        "Incredible platform with amazing features. Our team efficiency has improved dramatically since we started using it.",
    },
  ]

  const faqItems = [
    {
      title: "How does the free trial work?",
      content:
        "You get full access to all features for 14 days, no credit card required. You can upgrade anytime during or after the trial.",
    },
    {
      title: "Can I change my plan later?",
      content:
        "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and billing is prorated.",
    },
    {
      title: "What kind of support do you offer?",
      content:
        "We offer 24/7 email support for all plans, with priority phone support for Pro and Enterprise customers.",
    },
    {
      title: "Is my data secure?",
      content:
        "Absolutely. We use enterprise-grade security with end-to-end encryption, regular backups, and SOC 2 compliance.",
    },
    {
      title: "Do you offer refunds?",
      content: "Yes, we offer a 30-day money-back guarantee for all paid plans. No questions asked.",
    },
  ]

  const blogPosts = [
    {
      title: "10 Ways to Boost Team Productivity",
      description: "Discover proven strategies to enhance your team's efficiency and collaboration.",
      author: "John Smith",
      date: "Dec 15, 2024",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "The Future of Remote Work",
      description: "Exploring trends and technologies shaping the future of distributed teams.",
      author: "Jane Doe",
      date: "Dec 12, 2024",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Security Best Practices for SaaS",
      description: "Essential security measures every SaaS company should implement.",
      author: "Mike Johnson",
      date: "Dec 10, 2024",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  // Pricing calculator
  const calculatePrice = () => {
    const basePrice = users <= 5 ? 29 : users <= 20 ? 79 : 149
    const discount = billingType === "yearly" ? 0.8 : 1
    return Math.round(basePrice * discount)
  }

  // Form validation
  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.name.trim()) {
      errors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid"
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // Handle form submission
      console.log("Form submitted:", formData)
      // Reset form
      setFormData({ name: "", email: "", message: "" })
      setFormErrors({})
    }
  }

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-5" />
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl"
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Transform Your
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {" "}
                Business
              </span>
              <br />
              With AI-Powered SaaS
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-300 mb-8 max-w-2xl"
            >
              Streamline your workflow, boost productivity, and scale your business with our cutting-edge platform
              trusted by over 10,000 companies worldwide.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                Start Free Trial
              </Button>
              <Button variant="secondary" size="lg" onClick={() => setIsVideoModalOpen(true)}>
                <Play className="w-5 h-5" />
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-2xl">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="SaaS Dashboard"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                Live Dashboard
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Powerful Features for Modern Teams</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to streamline your workflow and boost productivity
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card icon={feature.icon} title={feature.title} subtitle={feature.description}>
                  <div></div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose the perfect plan for your team size and needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              planName="Starter"
              price="$29"
              features={[
                "Up to 5 team members",
                "Basic analytics",
                "Email support",
                "10GB storage",
                "Standard integrations",
              ]}
              onSelect={() => console.log("Starter selected")}
            />

            <PricingCard
              planName="Professional"
              price="$79"
              features={[
                "Up to 20 team members",
                "Advanced analytics",
                "Priority support",
                "100GB storage",
                "All integrations",
                "Custom workflows",
              ]}
              highlighted={true}
              onSelect={() => console.log("Professional selected")}
            />

            <PricingCard
              planName="Enterprise"
              price="$149"
              features={[
                "Unlimited team members",
                "Custom analytics",
                "24/7 phone support",
                "Unlimited storage",
                "Custom integrations",
                "Dedicated account manager",
              ]}
              onSelect={() => console.log("Enterprise selected")}
            />
          </div>
        </div>
      </section>

      {/* Pricing Calculator */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Pricing Calculator</h2>
            <p className="text-xl text-gray-300">Calculate your custom pricing based on your needs</p>
          </motion.div>

          <Card className="max-w-2xl mx-auto">
            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-3">Number of Users: {users}</label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={users}
                  onChange={(e) => setUsers(Number.parseInt(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-400 mt-1">
                  <span>1</span>
                  <span>100</span>
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-3">Billing Type</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setBillingType("monthly")}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      billingType === "monthly"
                        ? "bg-blue-600 text-white"
                        : "bg-white/10 text-gray-300 hover:bg-white/20"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingType("yearly")}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      billingType === "yearly"
                        ? "bg-blue-600 text-white"
                        : "bg-white/10 text-gray-300 hover:bg-white/20"
                    }`}
                  >
                    Yearly (20% off)
                  </button>
                </div>
              </div>

              <div className="text-center pt-6 border-t border-white/20">
                <div className="text-4xl font-bold text-white mb-2">
                  ${calculatePrice()}
                  <span className="text-lg text-gray-300">/{billingType === "monthly" ? "month" : "year"}</span>
                </div>
                <Button size="lg" className="mt-4">
                  Get Started
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of satisfied customers who trust our platform
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <TestimonialCard {...testimonials[currentTestimonial]} />
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-8 gap-4">
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="p-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>

              <div className="flex gap-2 items-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial ? "bg-blue-400" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="p-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">See It In Action</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Watch how our platform can transform your workflow in just 2 minutes
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-4 shadow-2xl">
              <div
                className="relative aspect-video bg-black rounded-lg overflow-hidden group cursor-pointer"
                onClick={() => setIsVideoModalOpen(true)}
              >
                <Image
                  src="/placeholder.svg?height=400&width=700"
                  alt="Demo Video"
                  width={700}
                  height={400}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30 group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get answers to common questions about our platform
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Accordion items={faqItems} />
          </motion.div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Latest from Our Blog</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stay updated with the latest insights, tips, and industry trends
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card image={post.image} title={post.title} subtitle={post.description} className="h-full">
                  <div className="flex items-center justify-between text-sm text-gray-400 mt-4">
                    <span>{post.author}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(value) => setFormData((prev) => ({ ...prev, name: value }))}
                  error={formErrors.name}
                  required
                />

                <Input
                  label="Email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(value) => setFormData((prev) => ({ ...prev, email: value }))}
                  error={formErrors.email}
                  required
                />

                <Textarea
                  label="Message"
                  placeholder="Tell us about your project or ask us a question..."
                  value={formData.message}
                  onChange={(value) => setFormData((prev) => ({ ...prev, message: value }))}
                  error={formErrors.message}
                  required
                  rows={5}
                />

                <Button type="submit" size="lg" className="w-full">
                  <Mail className="w-5 h-5" />
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-lg rounded-2xl border border-white/20 p-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Transform Your Business?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of companies already using our platform to streamline their operations and boost
              productivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                Start Free Trial
              </Button>
              <Button variant="secondary" size="lg">
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <Modal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} title="Product Demo">
        <div className="aspect-video bg-black rounded-lg">
          <div className="w-full h-full flex items-center justify-center text-white">
            <div className="text-center">
              <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-gray-400">Video player would be embedded here</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
