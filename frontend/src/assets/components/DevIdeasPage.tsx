
import {
 
  CheckCircle,
  Lightbulb,

  Rocket,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// --- Helper Components & Data ---



// Added more comments to demonstrate scrolling
const comments = [
    { name: 'Emily Carter', timestamp: '2 days ago', text: "This is a great idea! I've been looking for a project like this to contribute to." },
    { name: 'David Lee', timestamp: '1 day ago', text: "I agree, the microservices architecture is a good approach. I'm interested in working on the device management service." },
    { name: 'Sophie Chen', timestamp: '22 hours ago', text: "Has anyone considered using MQTT for the message queue? It's lightweight and perfect for IoT." },
    { name: 'Marcus Rivera', timestamp: '15 hours ago', text: "Phase 2 with voice assistants will be the game changer. I'd love to help with the Alexa integration." },
    { name: 'Isabelle Garcia', timestamp: '7 hours ago', text: "The roadmap looks solid. Breaking it down into phases is smart. Looking forward to seeing the progress on Phase 1." },
    { name: 'Tom Nguyen', timestamp: '2 hours ago', text: "Great starting point. The API endpoints are well-defined." },
];


// --- Main Page Component ---

export function DevIdeasPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-gray-800">
      {/* Header */}
     

      {/* Main Content */}
      <main className="flex-1 bg-white px-10 py-12 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
              Project Idea: Smart Home Automation System
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              Submitted by{' '}
              <a href="#" className="font-medium text-primary hover:underline">Alex Turner</a>
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Left Column */}
            <div className="space-y-12 lg:col-span-2">
              <section>
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-xl bg-blue-400 p-3 text-white-0 "><Lightbulb className="h-7 w-7" /></div>
                  <h3 className="text-2xl font-bold text-slate-900 ">The Problem</h3>
                </div>
                <p className="text-base leading-relaxed text-slate-600">
                  Many homeowners struggle with managing various smart devices from different manufacturers, leading to a fragmented and inefficient smart home experience. There's a need for a unified system that integrates all devices, providing seamless control and automation.
                </p>
              </section>

              <section>
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-xl bg-green-100 p-3 text-green-600"><CheckCircle className="h-7 w-7" /></div>
                  <h3 className="text-2xl font-bold text-slate-900">The Solution</h3>
                </div>
                <p className="text-base leading-relaxed text-slate-600">
                  Develop a smart home automation system that acts as a central hub, allowing users to control and automate devices from different brands through a single interface. The system should support voice commands, scheduled automations, and real-time monitoring of device status.
                </p>
              </section>
            </div>

            {/* Right Column (Sidebar) */}
            <div className="space-y-8 lg:col-span-1">
              <section>
                <h3 className="mb-6 text-xl font-bold text-slate-900">Comments ({comments.length})</h3>
                {/* Scrollable Timeline container */}
                <div className="h-72 space-y-6 overflow-y-auto border-l-2 border-slate-200 pl-6 pr-4">
                  {comments.map((comment, index) => (
                    <div key={index}>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2">
                          <p className="text-sm font-semibold text-slate-800">{comment.name}</p>
                          <p className="text-xs text-slate-400">{comment.timestamp}</p>
                        </div>
                        <p className="mt-1 text-sm text-slate-600">{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Form to add a new comment */}
                <div className="mt-6 border-t border-slate-200 pt-6">
                  <div>
                    <Textarea placeholder="Add a comment..." className="w-full" rows={3}/>
                    <Button className="mt-2">Post Comment</Button>
                  </div>
                </div>
              </section>

              <section>
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-xl bg-yellow-100 p-3 text-yellow-600">
                    <Rocket className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Project Showcase</h3>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                  <p className="mb-4 text-sm text-slate-600">
                    Submit your project built based on this idea. Share live links or GitHub repositories to showcase your work.
                 </p>
                  <div className="flex flex-col gap-4">
                    <Input id="project-link" placeholder="https://github.com/your-repo" />
                    <Button>Submit Project</Button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}