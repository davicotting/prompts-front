import {
  SidebarContent,
  SidebarContentProps,
} from '@/components/sidebar/sidebar-content';
import { render, screen } from '@/lib/test-utils';
import userEvent from '@testing-library/user-event';

const pushMock = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}));

const promptsMock = [
  {
    id: '1',
    title: 'Title',
    content: 'Content',
  },
];

function makeSut(
  { prompts = promptsMock }: SidebarContentProps = {} as SidebarContentProps
) {
  return render(<SidebarContent prompts={prompts} />);
}

describe('SidebarContent', () => {
  const user = userEvent.setup();

  describe('Base behaviors', () => {
    it('should render prompts list', () => {
      const input = [
        {
          id: '1',
          title: 'Title 1',
          content: 'Content 1',
        },
        {
          id: '2',
          title: 'Title 2',
          content: 'Content 2',
        },
      ];

      makeSut({ prompts: input });
      expect(screen.getByText(input[0].title)).toBeInTheDocument();
      expect(screen.getAllByRole('paragraph')).toHaveLength(input.length);
    });

    it('should update input value on user typing', async () => {
      makeSut();
      const textInput = 'IA';
      const promptsInput = screen.getByPlaceholderText('Buscar prompts...');

      await user.type(promptsInput, textInput);

      expect(promptsInput).toHaveValue(textInput);
    });
  });

  describe('open / close', () => {
    it('should render de collapse sidebar button', () => {
      makeSut();

      const sidebar = screen.getByRole('complementary');

      const collapseSidebarButton = screen.getByRole('button', {
        name: /Minimizar sidebar/i,
      });

      const expandSidebarButton = screen.queryByRole('button', {
        name: /Expandir sidebar/i,
      });

      expect(sidebar).toBeVisible();
      expect(collapseSidebarButton).toBeVisible();
      expect(expandSidebarButton).not.toBeInTheDocument();
    });

    it('should render the expand button when sidebar is collapsed', async () => {
      makeSut();

      const sidebar = screen.getByRole('complementary');

      const collapseSidebarButton = screen.getByRole('button', {
        name: /Minimizar sidebar/i,
      });

      await user.click(collapseSidebarButton);

      const expandSidebarButton = screen.getByRole('button', {
        name: /Expandir sidebar/i,
      });

      expect(sidebar).toBeVisible();
      expect(expandSidebarButton).toBeInTheDocument();
      expect(collapseSidebarButton).not.toBeVisible();
    });
  });

  describe('New propt', () => {
    it('should render "new prompt" button', () => {
      makeSut();

      expect(screen.getByRole('button', { name: 'Novo prompt' })).toBeVisible();
    });
    it('should redirect user to route "/new" when click on "new prompt" button', async () => {
      makeSut();
      const newPromptButton = screen.getByRole('button', {
        name: /novo prompt/i,
      });

      await user.click(newPromptButton);

      expect(pushMock).toHaveBeenCalledWith('/new');
    });
  });

  describe('Search', () => {
    it('should navigate with an encoded URL when typing and clearing', async () => {
      makeSut();

      const textInput = 'I A';
      const searchInput = screen.getByPlaceholderText('Buscar prompts...');

      await user.type(searchInput, textInput);

      expect(pushMock).toHaveBeenCalled();
      const lastCall = pushMock.mock.calls.at(-1);
      expect(lastCall?.[0]).toBe('/?q=I%20A');

      await user.clear(searchInput);
      const clearLastCall = pushMock.mock.calls.at(-1);
      expect(clearLastCall?.[0]).toBe('/');
    });
  });
});
