'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Sparkles, Brain, Search, MessageSquare } from 'lucide-react';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              NoteGenius
            </h1>
          </div>
          <div className="space-x-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Your Notes, Supercharged with AI
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Take notes faster, organize smarter, and find anything instantly with
            AI-powered features.
          </p>
          <Link href="/signup">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Taking Smart Notes
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          <FeatureCard
            icon={<Brain className="h-8 w-8 text-primary" />}
            title="AI Summarization"
            description="Instantly summarize long notes into key points"
          />
          <FeatureCard
            icon={<Sparkles className="h-8 w-8 text-primary" />}
            title="Auto-Tagging"
            description="AI automatically generates relevant tags for your notes"
          />
          <FeatureCard
            icon={<Search className="h-8 w-8 text-primary" />}
            title="Semantic Search"
            description="Find notes by meaning, not just keywords"
          />
          <FeatureCard
            icon={<MessageSquare className="h-8 w-8 text-primary" />}
            title="Chat with Notes"
            description="Ask questions and get answers from your notes"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 mt-20 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p>Built by Swadhin Paul</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="https://github.com/thund3rhawk" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              GitHub
            </a>
            <a href="https://linkedin.com/in/swadhin-paul-933663224" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}
