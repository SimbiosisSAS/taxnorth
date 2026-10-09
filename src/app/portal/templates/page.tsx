import { Flashlight, Copy } from 'lucide-react'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyToken } from '@/lib/session'
import TemplatesCopy from './TemplatesCopy'

export const dynamic = 'force-dynamic'

export default async function TemplatesPage() {
  const cookieStore = await cookies()
  const proId = await verifyToken('pro', cookieStore.get('taxnorth_pro_id')?.value)
  if (!proId) redirect('/portal')

  const templates = [
    {
      id: 'intro',
      title: 'Initial Contact',
      versions: {
        en: `Hi [Client Name],\n\nMy name is [Your Name] from [Your Firm]. TaxNorth connected me with you because you're looking for help with your Canadian taxes.\n\nI specialize in working with newcomers to Canada and I'd love to help you navigate your first tax filing here. My rates for TaxNorth clients are [Your Rate].\n\nWould you be available for a quick 15-minute call this week?\n\nBest regards,\n[Your Name]`,
        es: `Hola [Nombre del Cliente],\n\nMi nombre es [Tu Nombre] de [Tu Firma]. TaxNorth me conectó contigo porque estás buscando ayuda con tus impuestos canadienses.\n\nMe especializo en trabajar con newcomers en Canadá y me encantaría ayudarte con tu primera declaración aquí. Mis tarifas para clientes de TaxNorth son [Tu Tarifa].\n\n¿Estarías disponible para una llamada rápida de 15 minutos esta semana?\n\nSaludos,\n[Tu Nombre]`,
        fr: `Bonjour [Nom du Client],\n\nJe m'appelle [Votre Nom] de [Votre Firme]. TaxNorth m'a mis en contact avec vous car vous cherchez de l'aide pour vos impôts canadiens.\n\nJe me spécialise dans l'accompagnement des nouveaux arrivants au Canada. Mes tarifs pour les clients TaxNorth sont [Votre Tarif].\n\nSeriez-vous disponible pour un appel rapide de 15 minutes cette semaine?\n\nCordialement,\n[Votre Nom]`,
        zh: `您好 [客户姓名]，\n\n我是[您的姓名]，来自[您的公司]。TaxNorth将您介绍给我，因为您正在寻求加拿大税务帮助。\n\n我专门为加拿大新移民提供税务服务，很乐意帮助您完成在这里的第一次报税。TaxNorth客户的费率为[您的费率]。\n\n您这周是否方便进行15分钟的快速通话？\n\n此致，\n[您的姓名]`,
      }
    },
    {
      id: 'documents',
      title: 'Documents Needed',
      versions: {
        en: `Hi [Client Name],\n\nThank you for connecting through TaxNorth. To get started on your tax return, please gather the following documents:\n\n• T4 slip(s) from each employer\n• Social Insurance Number (SIN)\n• Date you arrived in Canada\n• Any other income statements\n• Previous year's Notice of Assessment (if available)\n\nPlease send these to [Your Email] or we can review them together during our call.\n\nBest regards,\n[Your Name]`,
        es: `Hola [Nombre del Cliente],\n\nGracias por conectarte a través de TaxNorth. Para comenzar con tu declaración de impuestos, por favor reúne los siguientes documentos:\n\n• Feuillet(s) T4 de cada empleador\n• Número de Seguro Social (SIN)\n• Fecha en que llegaste a Canadá\n• Cualquier otro estado de ingresos\n• Notice of Assessment del año anterior (si está disponible)\n\nEnvíalos a [Tu Email] o los revisamos juntos durante nuestra llamada.\n\nSaludos,\n[Tu Nombre]`,
        fr: `Bonjour [Nom du Client],\n\nMerci de vous être connecté via TaxNorth. Pour commencer votre déclaration, veuillez rassembler les documents suivants:\n\n• Feuillet(s) T4 de chaque employeur\n• Numéro d'assurance sociale (NAS)\n• Date d'arrivée au Canada\n• Tout autre relevé de revenus\n• Avis de cotisation de l'année précédente (si disponible)\n\nEnvoyez-les à [Votre Email] ou nous les examinerons ensemble lors de notre appel.\n\nCordialement,\n[Votre Nom]`,
        zh: `您好 [客户姓名]，\n\n感谢您通过TaxNorth与我联系。为了开始处理您的报税，请准备以下文件：\n\n• 每位雇主的T4单\n• 社会保险号码（SIN）\n• 您到达加拿大的日期\n• 其他收入证明\n• 上一年度的税务评估通知（如有）\n\n请发送至[您的邮箱]或我们可以在通话中一起查看。\n\n此致，\n[您的姓名]`,
      }
    },
    {
      id: 'completed',
      title: 'Filing Completed',
      versions: {
        en: `Hi [Client Name],\n\nYour tax return has been filed successfully! Here's a summary:\n\n• Filing date: [Date]\n• Expected refund/balance: [Amount]\n• Your return will be processed by the CRA within 2 weeks if filed electronically\n\nRemember to set up direct deposit with the CRA at canada.ca to receive your refund faster.\n\nThank you for trusting me with your taxes. Feel free to reach out if you have any questions.\n\nBest regards,\n[Your Name]`,
        es: `Hola [Nombre del Cliente],\n\n¡Tu declaración de impuestos ha sido presentada exitosamente! Aquí un resumen:\n\n• Fecha de presentación: [Fecha]\n• Reembolso/saldo esperado: [Monto]\n• Tu declaración será procesada por la CRA en 2 semanas si fue electrónica\n\nRecuerda configurar el depósito directo con la CRA en canada.ca para recibir tu reembolso más rápido.\n\nGracias por confiarme tus impuestos.\n\nSaludos,\n[Tu Nombre]`,
        fr: `Bonjour [Nom du Client],\n\nVotre déclaration a été soumise avec succès! Voici un résumé:\n\n• Date de soumission: [Date]\n• Remboursement/solde attendu: [Montant]\n• Votre déclaration sera traitée par l'ARC dans 2 semaines si soumise électroniquement\n\nN'oubliez pas de configurer le dépôt direct avec l'ARC sur canada.ca.\n\nMerci de m'avoir fait confiance.\n\nCordialement,\n[Votre Nom]`,
        zh: `您好 [客户姓名]，\n\n您的税务申报已成功提交！以下是摘要：\n\n• 申报日期：[日期]\n• 预计退款/余额：[金额]\n• 如果是电子申报，CRA将在2周内处理\n\n请记得在canada.ca设置直接存款，以便更快收到退款。\n\n感谢您对我的信任。\n\n此致，\n[您的姓名]`,
      }
    }
  ]

  return (
    <div className="min-h-screen bg-fog-gray">
      <nav className="bg-midnight-north px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <Flashlight className="w-4 h-4 text-lantern-amber" />
            </div>
            <span className="font-heading font-bold text-white">
              TaxNorth <span className="text-lantern-amber text-sm">Partner</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/portal/dashboard" className="text-white/60 text-sm hover:text-white transition-colors">
              ← Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="font-heading font-bold text-midnight-north text-2xl mb-2">
          Multilingual Templates
        </h1>
        <p className="text-deep-ink/60 mb-8">
          Ready-to-use email templates in English, Spanish, French, and Mandarin. Click to copy.
        </p>
        <TemplatesCopy templates={templates} />
      </div>
    </div>
  )
}