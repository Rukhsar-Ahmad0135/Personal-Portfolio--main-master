import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { photographerInfo } from "@/data/photographer";

const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  projectType: z.enum(["web", "fullstack", "aiml", "other"], {
    required_error: "Please select a project type",
  }),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const PROJECT_LABEL: Record<ContactFormValues["projectType"], string> = {
  web: "Frontend / UI",
  fullstack: "Full-Stack Web App",
  aiml: "AI / ML Integration",
  other: "Something else",
};

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", projectType: undefined, message: "" },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      // formsubmit.co AJAX endpoint — delivers straight to the inbox, no signup.
      const response = await fetch(
        `https://formsubmit.co/ajax/${photographerInfo.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            project_type: PROJECT_LABEL[data.projectType],
            message: data.message,
            _subject: `Portfolio inquiry — ${PROJECT_LABEL[data.projectType]} (${data.name})`,
            _template: "table",
            _captcha: "false",
          }),
        },
      );

      if (!response.ok) throw new Error("Failed to send message");

      setIsSuccess(true);
      form.reset();
      setTimeout(() => setIsSuccess(false), 6000);
    } catch {
      form.setError("root", {
        message: "Failed to send message. Please email me directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        className="bg-accent border border-border rounded-sm p-8 text-center space-y-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
        >
          <CheckCircle2 className="size-16 mx-auto text-emerald-600 dark:text-emerald-400" />
        </motion.div>
        <h3 className="text-2xl font-light tracking-wide">Message sent!</h3>
        <p className="text-muted-foreground font-light leading-relaxed">
          Thanks for reaching out — I'll reply within 24–48 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-light tracking-wide">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Your full name"
                  className="font-light text-black bg-white"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs font-light" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-light tracking-wide">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
className="font-light text-black bg-white"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs font-light" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-light tracking-wide">
                Project Type
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  {/* Explicit light styling — the site theme defaults to dark,
                      which renders this control unreadable on the white card. */}
                  <SelectTrigger className="font-light bg-white text-black border-black/20 data-[placeholder]:text-black/60">
                    <SelectValue placeholder="What can I help you build?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white text-black border-black/10 z-50">
                  <SelectItem value="web" className="font-light focus:bg-black/5 focus:text-black data-[state=checked]:text-black">
                    Frontend / UI
                  </SelectItem>
                  <SelectItem value="fullstack" className="font-light focus:bg-black/5 focus:text-black data-[state=checked]:text-black">
                    Full-Stack Web App
                  </SelectItem>
                  <SelectItem value="aiml" className="font-light focus:bg-black/5 focus:text-black data-[state=checked]:text-black">
                    AI / ML Integration
                  </SelectItem>
                  <SelectItem value="other" className="font-light focus:bg-black/5 focus:text-black data-[state=checked]:text-black">
                    Something else
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-xs font-light" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-light tracking-wide">
                Message
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell me about your project, timeline and goals…"
className="min-h-32 font-light resize-none text-black bg-white"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs font-light" />
            </FormItem>
          )}
        />
        {form.formState.errors.root && (
          <div className="text-sm text-destructive font-light">
            {form.formState.errors.root.message}
          </div>
        )}
        <Button
          type="submit"
          className="w-full py-6 text-base font-light tracking-wide"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 size-5 animate-spin" />
              Sending…
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </Form>
  );
}
