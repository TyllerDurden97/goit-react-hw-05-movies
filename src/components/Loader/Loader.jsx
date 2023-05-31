import { Dna } from 'react-loader-spinner';
import css from 'components/Loader/Loader.module.css';


export const Loader = () => (
   <div className={css.loader}    
>
 <Dna
  visible={true}
  height="50"
  width="50"
  ariaLabel="dna-loading"
  wrapperStyle={{}}
   wrapperClass="dna-wrapper"      
/>
   </div>  
)