import Link from "next/link";
import { ArrowRight, Armchair } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-x grid min-h-[70vh] place-items-center py-20 text-center">
      <div className="max-w-lg">
        <span className="mx-auto mb-7 grid size-14 place-items-center rounded-full bg-clay-100 text-clay-700">
          <Armchair size={24} />
        </span>
        <p className="text-xs font-medium tracking-[0.28em] text-clay-600 uppercase">
          404
        </p>
        <h1 className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl">
          This piece has been moved
        </h1>
        <p className="mt-5 text-base leading-relaxed text-sand-600">
          The page you were looking for is not in the showroom anymore. Try the
          full collection — everything is still there.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/products" size="lg">
            Shop the collection
            <ArrowRight size={17} />
          </ButtonLink>
          <ButtonLink href="/" size="lg" variant="outline">
            Back to home
          </ButtonLink>
        </div>
        <p className="mt-8 text-sm text-sand-500">
          Looking for something specific?{" "}
          <Link
            href="/contact"
            className="underline underline-offset-4 transition hover:text-ink"
          >
            Ask us directly
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
