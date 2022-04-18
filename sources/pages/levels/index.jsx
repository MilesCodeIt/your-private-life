import BrowserLayout from "@/components/BrowserLayout";
import Link from "next/link";

const levels = [
  {
    name: "Introduction",
    description: "Tutoriel d'introduction à Your Private Life. Analysez vos mails et triez les. Attention, les spams ne sont pas triés !",
    id: "introduction"
  }
];

export default function LevelsIndex () {

  return (
    <BrowserLayout>
      <h1>Niveaux</h1>

      <div>
        {levels.map(level => (
          <Link key={level.id} href={`/levels/${level.id}`} passHref>
            <a>
              <h3>{level.name}</h3>
              <span>{level.description}</span>
            </a>
          </Link>
        ))}
      </div>
    </BrowserLayout>
  );
}