import './Tasks.scss';
import { defaultTasks } from '~/lib/constants';
import { Button, Typography } from '@mui/material';

const Tasks = () => {
  return (
    <div className="tasks">
      <Typography variant="h5">Ваши задачи</Typography>
      <ul className="tasks__list">
        {defaultTasks.map((task, i) =>
          task.completed ? null : (
            <li key={task.id} className="tasks__item">
              <task.icon />
              <Typography fontSize={14}>{task.title}</Typography>
              <Typography fontSize={16}>+{task.reward} TON</Typography>
              <a href={task.link} target="_blank" rel="noreferrer">
                <Button className={`tasks__btn ${i % 2 === 0 ? 'tasks__btn_sway-x' : 'tasks__btn_sway-y'}`}>go</Button>
              </a>
            </li>
          ),
        )}
      </ul>
    </div>
  );
};
export default Tasks;
