import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group";

const formSchema = z.object({
    name: z
        .string()
        .min(2, "El nombre debe tener al menos 2 caracteres.")
        .max(64, "El nombre debe tener como máximo 64 caracteres."),
    email: z.string().email("Introduce un correo electrónico válido."),
    description: z
        .string()
        .min(10, "El mensaje debe tener al menos 10 caracteres.")
        .max(500, "El mensaje debe tener como máximo 500 caracteres."),
});

interface ContactFormProps {
    className?: string;
}

export function ContactForm({ className }: ContactFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            description: "",
        },
    });

    function onSubmit(_data: z.infer<typeof formSchema>) {
        toast("Mensaje enviado", {
            description: "Nos pondremos en contacto contigo pronto.",
            position: "bottom-right",
        });
        form.reset();
    }

    return (
        <Card className={`border-none shadow-none w-full ${className}`}>
            <CardContent>
                <form id="contact-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="contact-name" className="text-md">
                                        Nombre
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="contact-name"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Nuestro futuro cliente"
                                        autoComplete="name"
                                        className="bg-white border-none h-12"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="contact-email" className="text-md">
                                        Correo electrónico
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="contact-email"
                                        type="email"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="tu@email.com"
                                        autoComplete="email"
                                        className="bg-white border-none h-12"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="description"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="contact-message" className="text-md">
                                        Mensaje
                                    </FieldLabel>
                                    <InputGroup className="bg-white border-none">
                                        <InputGroupTextarea
                                            {...field}
                                            id="contact-message"
                                            placeholder="¿Cómo podemos ayudarte?"
                                            rows={6}
                                            className="min-h-24 resize-none"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        <InputGroupAddon align="block-end">
                                            <InputGroupText className="tabular-nums">
                                                {field.value.length}/500
                                                caracteres
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Field orientation="horizontal">
                    <Button type="submit" form="contact-form" className="w-full h-16 text-lg">
                        Enviar
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    );
}
