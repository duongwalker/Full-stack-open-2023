// src/components/Todo.test.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import Todo from './Todo'
import { describe, it, expect, vi } from 'vitest'

describe('Todo component', () => {
  it('renders todo text', () => {
    const todo = { text: 'Learn Testing', done: false }
    render(<Todo todo={todo} deleteTodo={() => {}} completeTodo={() => {}} />)
    expect(screen.getByText('Learn Testing')).toBeDefined()
  })

  it('shows correct buttons when todo is not done', () => {
    const todo = { text: 'Do homework', done: false }
    render(<Todo todo={todo} deleteTodo={() => {}} completeTodo={() => {}} />)
    expect(screen.getByText('Delete')).toBeDefined()
    expect(screen.getByText('Set as done')).toBeDefined()
    expect(screen.getByText('This todo is not done')).toBeDefined()
  })

  it('shows correct UI when todo is done', () => {
    const todo = { text: 'Walk dog', done: true }
    render(<Todo todo={todo} deleteTodo={() => {}} completeTodo={() => {}} />)
    expect(screen.getByText('This todo is done')).toBeDefined()
    expect(screen.queryByText('Set as done')).toBeNull()
  })

  it('calls deleteTodo when Delete is clicked', () => {
    const todo = { text: 'Write test', done: false }
    const deleteMock = vi.fn()
    render(<Todo todo={todo} deleteTodo={deleteMock} completeTodo={() => {}} />)

    fireEvent.click(screen.getByText('Delete'))
    expect(deleteMock).toHaveBeenCalledWith(todo)
  })

  it('calls completeTodo when Set as done is clicked', () => {
    const todo = { text: 'Submit assignment', done: false }
    const completeMock = vi.fn()
    render(<Todo todo={todo} deleteTodo={() => {}} completeTodo={completeMock} />)

    fireEvent.click(screen.getByText('Set as done'))
    expect(completeMock).toHaveBeenCalledWith(todo)
  })
})
