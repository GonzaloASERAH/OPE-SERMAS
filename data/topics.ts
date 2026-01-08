import { Topic, TopicCategory } from '../types';

export const TOPICS: Topic[] = [
  {
    id: 1,
    title: "La Constitución española de 1978",
    category: TopicCategory.Legal,
    subtopics: [
      {
        id: "1.1",
        title: "Estructura y contenido",
        content: `
### Bloque I: Estructura y Contenido
La Constitución fue aprobada por las Cortes y ratificada por el pueblo español en 1978, entrando en vigor el mismo día de su publicación en el BOE, el 29 de diciembre.

**Composición cuantitativa:**
Consta de un Preámbulo, 169 artículos, cuatro disposiciones adicionales, nueve transitorias, una derogatoria y una final.

**División cualitativa:**
El texto se organiza en un Título Preliminar y diez Títulos numerados.

**Partes de la Constitución:**
* **Parte Dogmática:** Incluye el Título Preliminar y el Título 1 (derechos y principios fundamentales).
* **Parte Orgánica:** Regula los grandes órganos del Estado: la Corona (Título 2), las Cortes Generales (Título 3), el Gobierno y la Administración (Título 4), el Poder Judicial (Título 6) y la Organización Territorial (Título 8).
* **Garantía y Reforma:** Recogidas en el Título 9 (Tribunal Constitucional) y el Título 10 (Reforma Constitucional).
        `
      },
      {
        id: "1.2",
        title: "Título preliminar",
        content: `
### Bloque II: Título Preliminar
Comprende los artículos 1 al 9 y establece los pilares del Estado.

* **Definición de Estado (Artículo 1):** España se constituye en un Estado social y democrático de Derecho. Sus valores superiores son la libertad, la justicia, la igualdad y el pluralismo político.
* **Soberanía y Forma Política (Artículo 1):** La soberanía nacional reside en el pueblo español y la forma política es la Monarquía parlamentaria.
* **Unidad y Autonomía (Artículo 2):** Se fundamenta en la unidad indisoluble de la Nación, pero reconoce el derecho a la autonomía de sus nacionalidades y regiones.
* **Idioma y Símbolos (Artículo 3 al 5):** El castellano es la lengua oficial del Estado; la bandera tiene tres franjas (roja, amarilla y roja, siendo la amarilla de doble anchura) y la capital es la villa de Madrid.
* **Instituciones (Artículo 6 al 8):** Los partidos políticos, sindicatos y asociaciones empresariales son fundamentales para la participación. Las Fuerzas Armadas tienen la misión de garantizar la soberanía, independencia e integridad territorial.
* **Principios Jurídicos (Artículo 9):** Garantiza la legalidad, la jerarquía normativa, la publicidad de las normas y la seguridad jurídica.
        `
      },
      {
        id: "1.3",
        title: "Derechos y deberes fundamentales",
        content: `
### Bloque III: Derechos y Deberes Fundamentales
Se encuentran en el Título I (Artículos 10 al 55), el cual se divide en cinco capítulos:

* **Artículo 10:** Establece que la dignidad de la persona y sus derechos inviolables son el fundamento del orden político.
* **Capítulo I (Españoles y extranjeros):** Regula la mayoría de edad a los 18 años (Artículo 12) y el derecho de asilo.
* **Capítulo II (Derechos y libertades):**
    * **Artículo 14:** Proclama la igualdad ante la ley sin discriminación.
    * **Sección 1.ª (Artículos 15 al 29):** Derechos fundamentales y libertades públicas (vida, libertad ideológica, libertad y seguridad, honor, educación, libertad sindical y huelga).
    * **Sección 2.ª (Artículos 30 al 38):** Derechos y deberes de los ciudadanos (defensa de España, sostenimiento de gastos públicos, matrimonio, propiedad privada y derecho al trabajo).
* **Capítulo III (Principios rectores):** Normas que deben guiar la actuación de los poderes públicos, como la protección de la familia, la Seguridad Social y la cultura.
* **Garantías y Suspensión (Capítulos 4 y 5):** Los derechos de la Sección 1.ª y el Artículo 14 cuentan con la protección del recurso de amparo ante el Tribunal Constitucional. Algunos derechos pueden suspenderse en estados de excepción o sitio.
        `
      },
      {
        id: "1.4",
        title: "La protección de la salud en la Constitución",
        content: `
### Bloque IV: La Protección de la Salud
La salud se regula principalmente en el **Artículo 43**, dentro de los principios rectores de la política social y económica.

* **Derecho a la protección:** La Constitución reconoce el derecho a la protección de la salud.
* **Obligación de los Poderes Públicos:** Compete a estos organizar y tutelar la salud pública mediante medidas preventivas y las prestaciones y servicios necesarios.
* **Fomento de la salud:** Los poderes públicos deben fomentar la educación sanitaria, la educación física, el deporte y la adecuada utilización del ocio.
* **Seguridad Social (Artículo 41):** Los poderes públicos deben mantener un régimen público de Seguridad Social que garantice la asistencia y prestaciones sociales suficientes ante situaciones de necesidad.
* **Consumidores (Artículo 51):** Se establece que los poderes públicos garantizarán la defensa de los consumidores, protegiendo especialmente su seguridad y salud.
* **Aplicación jurídica (Artículo 53.3):** El reconocimiento de la protección de la salud informará la legislación positiva y la práctica judicial, pero solo podrá ser alegado ante la jurisdicción ordinaria de acuerdo con las leyes que lo desarrollen.

**Estrategia de estudio:**
Considere que la Constitución es la "partitura maestra" sobre la que se interpreta toda la normativa sanitaria española. El Título Preliminar marca el ritmo (Estado de Derecho), el Título I define las notas (derechos ciudadanos) y el Artículo 43 es el instrumento específico que permite al SERMAS existir y funcionar.
        `
      }
    ]
  },
  { id: 2, title: "El Estatuto de Autonomía de la Comunidad de Madrid", category: TopicCategory.Legal, subtopics: [] },
  { id: 3, title: "La Ley de Gobierno y Administración de la Comunidad de Madrid", category: TopicCategory.Legal, subtopics: [] },
  { id: 4, title: "Ley 14/1986 General de Sanidad", category: TopicCategory.SERMAS, subtopics: [] },
  { id: 5, title: "Ley 12/2001 de Ordenación Sanitaria de la CM", category: TopicCategory.SERMAS, subtopics: [] },
  { id: 6, title: "Ley Orgánica contra la Violencia de Género e Igualdad", category: TopicCategory.Legal, subtopics: [] },
  { id: 7, title: "Ley 16/2003 de cohesión y calidad del SNS", category: TopicCategory.Legal, subtopics: [] },
  { id: 8, title: "Las modalidades de la asistencia sanitaria", category: TopicCategory.SERMAS, subtopics: [] },
  { id: 9, title: "Ley 40/2015 de Régimen Jurídico del Sector Público", category: TopicCategory.Legal, subtopics: [] },
  { id: 10, title: "Ley 39/2015 del Procedimiento Administrativo Común (I)", category: TopicCategory.Legal, subtopics: [] },
  { id: 11, title: "Ley 39/2015 del Procedimiento Administrativo Común (II)", category: TopicCategory.Legal, subtopics: [] },
  { id: 12, title: "Ley 11/2017 de Buen gobierno del SERMAS", category: TopicCategory.SERMAS, subtopics: [] },
  { id: 13, title: "Ley 31/1995 de Prevención de Riesgos laborales", category: TopicCategory.Legal, subtopics: [] },
  { id: 14, title: "Estatuto Básico del Empleado Público", category: TopicCategory.Legal, subtopics: [] },
  { id: 15, title: "Estatuto Marco del personal estatutario (I)", category: TopicCategory.Legal, subtopics: [] },
  { id: 16, title: "Estatuto Marco del personal estatutario (II)", category: TopicCategory.Legal, subtopics: [] },
  { id: 17, title: "Estatuto Marco del personal estatutario (III)", category: TopicCategory.Legal, subtopics: [] },
  { id: 18, title: "Protección integral a la infancia y adolescencia", category: TopicCategory.Legal, subtopics: [] },
  { id: 19, title: "Ley General de la Seguridad Social", category: TopicCategory.Legal, subtopics: [] },
  { id: 20, title: "Documentación de uso de las Instituciones Sanitarias", category: TopicCategory.SERMAS, subtopics: [] },
  { id: 21, title: "El servicio de Admisión y documentación clínica", category: TopicCategory.SERMAS, subtopics: [] },
  { id: 22, title: "Información administrativa y atención al ciudadano", category: TopicCategory.SERMAS, subtopics: [] },
  { id: 23, title: "La protección de datos (RGPD)", category: TopicCategory.Legal, subtopics: [] },
  { id: 24, title: "Ley de Contratos del Sector Público", category: TopicCategory.Legal, subtopics: [] },
  { id: 25, title: "Los centros hospitalarios", category: TopicCategory.SERMAS, subtopics: [] },
  { id: 26, title: "Plataformas informáticas sanitarias (Cibeles, HCE)", category: TopicCategory.SERMAS, subtopics: [] },
  { id: 27, title: "Trabajo en el entorno gráfico de Windows 10", category: TopicCategory.IT, subtopics: [] },
  { id: 28, title: "Word 2016 principales funciones", category: TopicCategory.IT, subtopics: [] },
  { id: 29, title: "Excel 2016 principales funciones", category: TopicCategory.IT, subtopics: [] },
  { id: 30, title: "Redes de Comunicaciones e Internet", category: TopicCategory.IT, subtopics: [] },
  { id: 31, title: "La Administración Electrónica en la CM", category: TopicCategory.SERMAS, subtopics: [] },
];

// Helper to get dummy content if real content is missing
export const getTopicContent = (topicId: number): Topic => {
  const topic = TOPICS.find(t => t.id === topicId);
  if (!topic) throw new Error("Topic not found");

  if (topic.subtopics.length === 0) {
    // Generate placeholder content for demo purposes
    return {
      ...topic,
      subtopics: [
        { id: `${topic.id}.1`, title: "Introducción y Conceptos Básicos", content: "Contenido pendiente de digitalización. Consulte el temario oficial en PDF." },
        { id: `${topic.id}.2`, title: "Marco Normativo", content: "Referencias legales y normativa aplicable a este tema." },
        { id: `${topic.id}.3`, title: "Aplicación Práctica", content: "Ejemplos de aplicación en el entorno del SERMAS." }
      ]
    }
  }
  return topic;
};