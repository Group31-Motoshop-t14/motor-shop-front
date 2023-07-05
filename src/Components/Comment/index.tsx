import { ICommentProps } from "@/app/announcement/[id]/page";
import { ModalContext } from "@/contexts/ModalContext.tsx";
import { Dispatch, SetStateAction, useContext } from "react";
import { BsFillPencilFill } from "react-icons/bs";

interface CommentProps {
  comment: ICommentProps;
  setComments: Dispatch<SetStateAction<ICommentProps[]>>
}

const Comment = ({ comment, setComments }: CommentProps) => {

  const { openModal } = useContext(ModalContext);

  const calcDaysAgo = () => {
    const currentDate = new Date();
    const commentDate = new Date(comment.createdAt);
    const timeDiff = currentDate.getTime() - commentDate.getTime();
    const resp =
      Math.floor(timeDiff / (1000 * 3600 * 24)) === -1
        ? 0
        : Math.floor(timeDiff / (1000 * 3600 * 24));

    return resp;
  };

  return (
    <li className="flex flex-col gap-3">
      <div className="flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <span className="prose-body-2-600 flex h-8 w-8 items-center justify-center rounded-full bg-Brand2 text-grey10">
            {comment.user.name[0].toUpperCase()}
          </span>
          <span className="prose-body-2-600 text-grey2">{comment.user.name}</span>
          <span className="h-1 w-1 rounded-full bg-grey4" />
          <span className="prose-body-2-400 text-xs text-grey3">há {calcDaysAgo()} dias</span>
        </div>
        <button onClick={() => openModal("editComment", "Editar Comentário", comment.id, comment.content)}>
        <BsFillPencilFill/>
        </button>
      </div>
      <p className="prose-body-2 text-grey2">{comment.content}</p>
    </li>
  );
};

export default Comment;
