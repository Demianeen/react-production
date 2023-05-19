import { Page } from 'widgets/Page'
import { useTranslation } from 'react-i18next'

interface AdminPanelPageProps {
  className?: string
}

const AdminPanelPage = ({
  className,
}: AdminPanelPageProps) => {
  const { t } = useTranslation('admin')
  return (
    <Page className={className}>{t('Admin panel')}</Page>
  )
}

export default AdminPanelPage
