
import { useFieldArray, useFormContext } from 'react-hook-form';
 
interface FriendsFormValues {
  name: string;
  contacts: { name: string }[];
}
 
function useFormField(prefix: string) {
  const { control, register } = useFormContext();
 
  const nameInputPath = `${prefix}name` as 'name';
  const contactsArrayInputPath = `${prefix}contacts` as 'contacts';
 
  const { fields, append, remove } = useFieldArray({
    control,
    name: contactsArrayInputPath,
  });
 
  const addNewFriend = () => {
    append({
      name: '',
    });
  };
 
  const removeFriend = (friendIndex: number) => () => {
    remove(friendIndex);
  };
 
  return {
    fields,
    register,
    addNewFriend,
    removeFriend,
    nameInputPath,
  };
}
 
export default useFormField;