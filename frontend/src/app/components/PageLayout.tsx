import React from 'react'

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className='flex flex-col justify-center items-center'>
      {children}
    </section>
  )
}

export default PageLayout